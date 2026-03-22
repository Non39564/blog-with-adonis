import Form from '#models/form'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PostSeeder extends BaseSeeder {
  async run() {
      await Form.createMany([
        {
          title: "Hello AdonisJS",
          body: "Adonis includes everything you need to create fully functional web app or an API server.",
          userId: 1
        },
        {
          title: "VueJS",
          body: "Vue is a progressive framework for building user interfaces.",
          userId: 1
        }
      ])
  }
}