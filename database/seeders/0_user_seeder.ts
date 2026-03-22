import User from '#models/User'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder {
  public async run () {
    await User.create({
      username: 'user1',
      password: await hash.make('password1'),
      fullName: 'User One'
    })
  }
}
