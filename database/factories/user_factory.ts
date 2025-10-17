import factory from '@adonisjs/lucid/factories'
import User from '#DI2/models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 75 }),
      isActive: faker.datatype.boolean({ probability: 0.9 }), // 90% actifs
    }
  })
  .build()
