import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'

export default class ShopItem extends BaseModel {
  static table = 'shop_items'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare imageUrl: string

  @column()
  declare price: number

  @column()
  declare promoPrice: number | null

  @column()
  declare promoPercentage: number | null

  @column()
  declare isActive: boolean

  @computed()
  get hasPromo() {
    return this.promoPrice !== null || this.promoPercentage !== null
  }

  @computed()
  get finalPrice() {
    if (this.promoPrice !== null) {
      return this.promoPrice
    }
    if (this.promoPercentage !== null) {
      return this.price * (1 - this.promoPercentage / 100)
    }
    return this.price
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
