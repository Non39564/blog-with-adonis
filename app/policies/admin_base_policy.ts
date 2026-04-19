import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Role from '../contracts/Role.js'

export default class AdminBasePolicy extends BasePolicy {
  async before(user: User | null, _action: string, ..._params: any[]) {
    if (user?.role == Role.ADMIN && user) {
      return true
    }
  }
}
