import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shop_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('image_url').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.decimal('promo_price', 10, 2).nullable()
      table.integer('promo_percentage').nullable()
      table.boolean('is_active').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
