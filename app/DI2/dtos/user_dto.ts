import User from '#DI2/models/user'
import { DateTime } from 'luxon'

export default class UserDto {
  public id: number
  public firstName: string
  public lastName: string
  public email: string
  public age: number
  public isActive: boolean
  public createdAt: DateTime
  public updatedAt: DateTime

  constructor(user: User) {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.age = user.age
    this.isActive = user.isActive
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }

  static toList(users: User[]): UserDto[] {
    return users.map((user) => new UserDto(user))
  }
}
