import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../app/contracts/Role.js'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { username: 'admin' },
      { password: 'admin', role: Role.ADMIN }
    )
  }
}
