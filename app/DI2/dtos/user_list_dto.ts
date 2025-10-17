import User from '#DI2/models/user'
import UserDto from '#DI2/dtos/user_dto'

export default class UserListDto {
  static fromPaginator(paginator: any) {
    return {
      data: paginator.all().map((user: User) => new UserDto(user)),
      meta: paginator.getMeta(),
    }
  }
}
