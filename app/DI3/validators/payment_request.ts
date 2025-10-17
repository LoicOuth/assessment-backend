import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

export const paymentRequestValidator = vine.compile(
  vine.object({
    sessionId: vine.string().minLength(1).maxLength(100),
    itemIds: vine
      .array(
        vine
          .number()
          .positive()
          .exists(async (_, value) => {
            const item = await db
              .from('shop_items')
              .where('id', value)
              .where('is_active', true)
              .first()
            return !!item
          })
      )
      .minLength(1)
      .distinct(),
    cardNumber: vine.string().minLength(16).maxLength(19),
  })
)
