import PaymentHistory from '#DI3/models/payment_history'
import ShopItemDto from '#DI3/dtos/shop_item_dto'

export default class PaymentHistoryDto {
  public id: number
  public sessionId: string
  public cardNumberMasked: string
  public totalAmount: number
  public status: 'success' | 'failed'
  public items: ShopItemDto[]
  public createdAt: string
  public updatedAt: string

  constructor(paymentHistory: PaymentHistory) {
    this.id = paymentHistory.id
    this.sessionId = paymentHistory.sessionId
    this.cardNumberMasked = paymentHistory.cardNumberMasked
    this.totalAmount = paymentHistory.totalAmount
    this.status = paymentHistory.status as 'success' | 'failed'
    this.items = paymentHistory.items
      ? paymentHistory.items.map((item) => new ShopItemDto(item))
      : []
    this.createdAt = paymentHistory.createdAt.toISO()!
    this.updatedAt = paymentHistory.updatedAt.toISO()!
  }

  static fromPaginator(paginator: any) {
    return {
      data: paginator.all().map((history: PaymentHistory) => new PaymentHistoryDto(history)),
      meta: paginator.getMeta(),
    }
  }
}
