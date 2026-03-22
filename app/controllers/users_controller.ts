import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    // ตรวจสอบ username และ password
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    return response.redirect().toRoute('posts.home')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
