import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { registerUserValidator } from '#validators/user'

export default class UsersController {
  async login({auth, request, response}: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    response.redirect().toRoute('posts.home')
  }

  async logout({auth, response}: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('login')
  }

  async login2({request, session, response}: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    try {
      const user = await User.findByOrFail('username', username)
      
      const isPasswordValid = await hash.verify(user.password, password)

      if (isPasswordValid) {
        session.put('user', user)
        response.redirect().toRoute('posts.home')
      } else {
        throw 'Invalid credentials'
      }
    } catch (error) {
      session.flash('error', 'Invalid credentials')
      response.redirect().toRoute('login')
    }
  }

  async logout2({session, response}: HttpContext) {
    session.clear()
    response.redirect().toRoute('login')
  }

  async register({session, request, response}:HttpContext){
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create({username: payload.username, password: payload.password})

    if(user){
        session.flash('message', {
            type: 'positive',
            message: 'The user is register successfully. Please use username and password to log in.'
        })
        response.redirect().toRoute('login')
    }
  }

  async verify({ request, response }: HttpContext) {
    const username = request.input('username')
    const user = await User.findBy('username', username)
    if (user) {
      return response.status(203).send('The username is already used!')
    }
  }
}