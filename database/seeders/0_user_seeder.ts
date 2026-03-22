import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'John Doe',
        username: 'john',
        password: 'secret',
      },
      {
        fullName: 'Jane Smith',
        username: 'jane',
        password: 'secret',
      },
    ])
  }
}