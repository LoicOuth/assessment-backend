import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  async run() {
    // Créer 50 utilisateurs aléatoires
    await UserFactory.createMany(50)
  }
}
