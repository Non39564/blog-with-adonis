import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate({ username: 'john' }, { fullName: 'John Doe', password: 'secret' })
    await User.updateOrCreate({ username: 'jane' }, { fullName: 'Jane Smith', password: 'secret' })
  }
}