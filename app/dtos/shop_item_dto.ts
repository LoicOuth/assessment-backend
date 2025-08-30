import ShopItem from '#models/shop_item'
import { DateTime } from 'luxon'

export default class ShopItemDto {
  public id: number
  public name: string
  public description: string
  public imageUrl: string
  public price: number
  public promoPrice: number | null
  public promoPercentage: number | null
  public finalPrice: number
  public hasPromo: boolean
  public createdAt: DateTime
  public updatedAt: DateTime

  constructor(shopItem: ShopItem) {
    this.id = shopItem.id
    this.name = shopItem.name
    this.description = shopItem.description
    this.imageUrl = shopItem.imageUrl
    this.price = shopItem.price
    this.promoPrice = shopItem.promoPrice
    this.promoPercentage = shopItem.promoPercentage
    this.finalPrice = shopItem.finalPrice
    this.hasPromo = shopItem.hasPromo
    this.createdAt = shopItem.createdAt
    this.updatedAt = shopItem.updatedAt
  }

  static toList(shopItems: ShopItem[]): ShopItemDto[] {
    return shopItems.map((item) => new ShopItemDto(item))
  }
}
