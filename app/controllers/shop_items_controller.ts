import type { HttpContext } from '@adonisjs/core/http'
import ShopItem from '#models/shop_item'
import ShopItemDto from '#dtos/shop_item_dto'
import { ERROR_CODES } from '#constants/error_codes'

export default class ShopItemsController {
  async index({ request, response }: HttpContext) {
    const query = ShopItem.query().where('is_active', true)

    const promotionsOnly = request.input('promotions')
    if (promotionsOnly === 'true' || promotionsOnly === true) {
      query.where((subQuery) => {
        subQuery.whereNotNull('promo_price').orWhereNotNull('promo_percentage')
      })
    }

    const items = await query.orderBy('name', 'asc')
    const formattedItems = ShopItemDto.toList(items)

    return response.ok(formattedItems)
  }

  async show({ params, response }: HttpContext) {
    const item = await ShopItem.query().where('id', params.id).where('is_active', true).first()

    if (!item) {
      return response.notFound(ERROR_CODES.ITEM_NOT_FOUND)
    }

    const formattedItem = new ShopItemDto(item)

    return response.ok(formattedItem)
  }
}
