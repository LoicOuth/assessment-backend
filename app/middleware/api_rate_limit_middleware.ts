import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import limiter from '@adonisjs/limiter/services/main'

export default class ApiRateLimitMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const clientIp = ctx.request.ip()

    const throttle = limiter.define(`api:${clientIp}`, () => {
      return limiter.allowRequests(100).every('15 minutes')
    })

    try {
      await throttle(ctx, next)
    } catch (error) {
      const retryAfter = error.retryAfter || 900 // 15 minutes en secondes

      ctx.response.header('X-RateLimit-Limit', '100')
      ctx.response.header('X-RateLimit-Remaining', '0')
      ctx.response.header('X-RateLimit-Reset', String(Math.floor(Date.now() / 1000) + retryAfter))
      ctx.response.header('Retry-After', String(retryAfter))

      return ctx.response.tooManyRequests(
        'Limite de requêtes dépassée. Veuillez réessayer dans 15 minutes.'
      )
    }
  }
}
