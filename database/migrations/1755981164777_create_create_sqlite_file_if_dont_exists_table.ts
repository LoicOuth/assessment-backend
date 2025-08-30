import app from '@adonisjs/core/services/app'
import { BaseSchema } from '@adonisjs/lucid/schema'
import { existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export default class extends BaseSchema {
  protected filename = app.tmpPath('db.sqlite3')

  async up() {
    if (!existsSync(this.filename)) {
      const dir = dirname(this.filename)
      mkdirSync(dir, { recursive: true })

      writeFileSync(this.filename, '')
    }
  }

  async down() {}
}
