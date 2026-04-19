import Comment from '#models/comment'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class CommentSeeder extends BaseSeeder {
  async run() {
    await Comment.updateOrCreate(
      { postId: 1, poster: 'Alice' },
      { comment: 'Great post about AdonisJS!' }
    )
    await Comment.updateOrCreate(
      { postId: 2, poster: 'Bob' },
      { comment: "I've been using VueJS for a while now." }
    )
    await Comment.updateOrCreate(
      { postId: 2, poster: 'Charlie' },
      { comment: 'Looking forward to more AdonisJS content.' }
    )
  }
}