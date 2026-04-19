import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Role from '../contracts/Role.js'
import { Exception } from '@adonisjs/core/exceptions'

export default class AclMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards: Role[] }
  ) {
    if (!options.guards.includes(ctx.auth.user!.role)) {
      throw new Exception('You are not authorized!', { code: 'E_UNAUTHORIZED', status: 403 })
    }

    const output = await next()
    return output
  }
}
