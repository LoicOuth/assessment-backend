import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payment_history_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('payment_history_id')
        .unsigned()
        .references('id')
        .inTable('payment_histories')
        .onDelete('CASCADE')
      table
        .integer('shop_item_id')
        .unsigned()
        .references('id')
        .inTable('shop_items')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Index pour optimiser les requêtes
      table.index(['payment_history_id', 'shop_item_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
