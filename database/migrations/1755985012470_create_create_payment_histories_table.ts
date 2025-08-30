import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payment_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('session_id').notNullable().index()
      table.string('card_number_masked').notNullable()
      table.decimal('total_amount', 10, 2).notNullable()
      table.enum('status', ['success', 'failed']).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
