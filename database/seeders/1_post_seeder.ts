import Post from '#models/post'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PostSeeder extends BaseSeeder {
  async run() {
    // Lab 13 / Lucid version
    // await Post.updateOrCreate(
    //   { title: 'Hello AdonisJS', userId: 1 },
    //   { body: 'Adonis includes everything you need to create fully functional web app or an API server.' }
    // )
    await Post.findOneAndUpdate(
      { title: 'Hello AdonisJS' },
      {
        title: 'Hello AdonisJS',
        body: 'Adonis includes everything you need to create fully functional web app or an API server.',
      },
      { upsert: true, new: true }
    )

    // Lab 13 / Lucid version
    // await Post.updateOrCreate(
    //   { title: 'VueJS', userId: 1 },
    //   { body: 'Vue is a progressive framework for building user interfaces.' }
    // )
    await Post.findOneAndUpdate(
      { title: 'VueJS' },
      { title: 'VueJS', body: 'Vue is a progressive framework for building user interfaces.' },
      { upsert: true, new: true }
    )
  }
}
