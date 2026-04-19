import Post from '#models/post'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PostSeeder extends BaseSeeder {
  async run() {
      await Post.updateOrCreate(
        { title: 'Hello AdonisJS', userId: 1 },
        { body: 'Adonis includes everything you need to create fully functional web app or an API server.' }
      )
      await Post.updateOrCreate(
        { title: 'VueJS', userId: 1 },
        { body: 'Vue is a progressive framework for building user interfaces.' }
      )
  }
}