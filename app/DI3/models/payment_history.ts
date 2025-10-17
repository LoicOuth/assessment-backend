import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import ShopItem from '#DI3/models/shop_item'

export default class PaymentHistory extends BaseModel {
  static table = 'payment_histories'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sessionId: string

  @column()
  declare cardNumberMasked: string

  @column()
  declare totalAmount: number

  @column()
  declare status: 'success' | 'failed'

  @manyToMany(() => ShopItem, {
    pivotTable: 'payment_history_items',
  })
  declare items: ManyToMany<typeof ShopItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
