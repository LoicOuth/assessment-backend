import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

/**
 * Validator pour la création d'un utilisateur
 */
export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(100),
    lastName: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (_, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    age: vine.number().min(18).max(120),
    isActive: vine.boolean().optional(),
  })
)

/**
 * Validator pour la modification d'un utilisateur (PUT)
 * Tous les champs sont requis
 */
export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(100),
    lastName: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (_, value, field) => {
        // Récupérer l'ID de l'utilisateur depuis les params de la requête
        const userId = field.meta.userId
        const user = await db.from('users').where('email', value).whereNot('id', userId).first()
        return !user
      }),
    age: vine.number().min(18).max(120),
    isActive: vine.boolean(),
  })
)
