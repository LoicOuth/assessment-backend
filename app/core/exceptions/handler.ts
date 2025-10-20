import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { ERROR_CODES } from '#DI3/constants/error_codes'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof Error) {
      if ('status' in error) {
        if (error.status === 404) {
          return ctx.response.notFound()
        }
      }

      logger.error(
        {
          error: error.message,
          stack: error.stack,
          url: ctx.request.url(),
          method: ctx.request.method(),
        },
        'Unhandled error occurred'
      )

      if (app.inProduction) {
        return ctx.response.internalServerError({ error: ERROR_CODES.INTERNAL_SERVER_ERROR })
      }
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
