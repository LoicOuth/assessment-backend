import type { HttpContext } from '@adonisjs/core/http'
import User from '#DI2/models/user'
import UserDto from '#DI2/dtos/user_dto'
import UserListDto from '#DI2/dtos/user_list_dto'
import { ERROR_CODES } from '#DI2/constants/error_codes'
import { createUserValidator, updateUserValidator } from '#DI2/validators/user_validator'

export default class UsersController {
  /**
   * Liste paginée des utilisateurs avec recherche textuelle
   * GET /api/users?page=1&perPage=10&search=john
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = Math.min(request.input('perPage', 10), 50) // Max 50 par page
    const search = request.input('search', '')

    const query = User.query()

    // Recherche textuelle sur firstName, lastName et email
    if (search) {
      console.log('Searching for:', search)
      query.where((subQuery) => {
        subQuery
          .whereLike('firstName', `%${search}%`)
          .orWhereLike('lastName', `%${search}%`)
          .orWhereLike('email', `%${search}%`)
      })
    }

    const paginator = await query.orderBy('created_at', 'desc').paginate(page, perPage)

    return response.ok(UserListDto.fromPaginator(paginator))
  }

  /**
   * Récupère le détail d'un utilisateur
   * GET /api/users/:id
   */
  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        error: ERROR_CODES.USER_NOT_FOUND,
        message: 'Utilisateur non trouvé',
      })
    }

    return response.ok(new UserDto(user))
  }

  /**
   * Crée un nouvel utilisateur
   * POST /api/users
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age,
      isActive: data.isActive ?? true,
    })

    return response.created(new UserDto(user))
  }

  /**
   * Met à jour un utilisateur (PUT - tous les champs requis)
   * PUT /api/users/:id
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        error: ERROR_CODES.USER_NOT_FOUND,
        message: 'Utilisateur non trouvé',
      })
    }

    // Passer l'ID de l'utilisateur pour la validation d'email unique
    const data = await request.validateUsing(updateUserValidator, {
      meta: {
        userId: user.id,
      },
    })

    // Mise à jour de tous les champs (tous sont requis en PUT)
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.email = data.email
    user.age = data.age
    user.isActive = data.isActive

    await user.save()

    return response.ok(new UserDto(user))
  }

  /**
   * Supprime un utilisateur (retourne toujours une erreur)
   * DELETE /api/users/:id
   */
  async destroy({ response }: HttpContext) {
    return response.forbidden({
      error: ERROR_CODES.DELETE_NOT_ALLOWED,
      message: "La suppression des utilisateurs n'est pas autorisée",
    })
  }
}
