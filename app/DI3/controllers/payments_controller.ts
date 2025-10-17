import type { HttpContext } from '@adonisjs/core/http'
import { paymentRequestValidator } from '#DI3/validators/payment_request'
import { ERROR_CODES } from '#DI3/constants/error_codes'
import PaymentHistory from '#DI3/models/payment_history'
import PaymentHistoryDto from '#DI3/dtos/payment_history_dto'
import ShopItem from '#DI3/models/shop_item'

export default class PaymentsController {
  private readonly VALID_CARD_NUMBER = '4111111111111111'

  async process({ request, response }: HttpContext) {
    const data = await request.validateUsing(paymentRequestValidator)

    await this.simulatePaymentProcessing()

    const items = await ShopItem.query().whereIn('id', data.itemIds).where('is_active', true)
    const totalAmount = items.reduce((sum, item) => sum + item.finalPrice, 0)

    if (!this.isValidCardNumber(data.cardNumber)) {
      const paymentHistory = await PaymentHistory.create({
        sessionId: data.sessionId,
        cardNumberMasked: this.maskCardNumber(data.cardNumber),
        totalAmount,
        status: 'failed',
      })

      // Attacher les items via la relation many-to-many
      await paymentHistory.related('items').attach(data.itemIds)

      return response.badRequest(ERROR_CODES.INVALID_CARD_NUMBER)
    }

    const paymentHistory = await PaymentHistory.create({
      sessionId: data.sessionId,
      cardNumberMasked: this.maskCardNumber(data.cardNumber),
      totalAmount,
      status: 'success',
    })

    // Attacher les items via la relation many-to-many
    await paymentHistory.related('items').attach(data.itemIds)

    return response.noContent()
  }

  async history({ request, response }: HttpContext) {
    const sessionId = request.param('sessionId')
    const page = request.input('page', 1)
    const perPage = Math.min(request.input('perPage', 10), 50)

    const paginator = await PaymentHistory.query()
      .where('session_id', sessionId)
      .preload('items')
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    return response.ok(PaymentHistoryDto.fromPaginator(paginator))
  }

  private isValidCardNumber(cardNumber: string): boolean {
    const cleanCardNumber = cardNumber.replace(/[\s-]/g, '')
    return cleanCardNumber === this.VALID_CARD_NUMBER
  }

  private maskCardNumber(cardNumber: string): string {
    const cleanCardNumber = cardNumber.replace(/[\s-]/g, '')
    if (cleanCardNumber.length < 4) return '****'
    return '****'.repeat(Math.max(0, cleanCardNumber.length - 4)) + cleanCardNumber.slice(-4)
  }

  private async simulatePaymentProcessing(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  }
}
