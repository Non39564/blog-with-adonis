import Comment from '#models/comment'
import Post from '#models/post'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class CommentSeeder extends BaseSeeder {
  async run() {
    // Lab 13 / Lucid version
    // await Comment.updateOrCreate(
    //   { postId: 1, poster: 'Alice' },
    //   { comment: 'Great post about AdonisJS!' }
    // )
    const aliceComment = await Comment.findOneAndUpdate(
      { poster: 'Alice', comment: 'Great post about AdonisJS!' },
      { poster: 'Alice', comment: 'Great post about AdonisJS!' },
      { upsert: true, new: true }
    )
    const adonisPost = await Post.findOne({ title: 'Hello AdonisJS' })
    if (
      adonisPost &&
      !adonisPost.comments.some((commentId) => commentId.equals(aliceComment._id))
    ) {
      adonisPost.comments.push(aliceComment._id)
      await adonisPost.save()
    }

    // Lab 13 / Lucid version
    // await Comment.updateOrCreate(
    //   { postId: 2, poster: 'Bob' },
    //   { comment: "I've been using VueJS for a while now." }
    // )
    const bobComment = await Comment.findOneAndUpdate(
      { poster: 'Bob', comment: "I've been using VueJS for a while now." },
      { poster: 'Bob', comment: "I've been using VueJS for a while now." },
      { upsert: true, new: true }
    )
    const vuePost = await Post.findOne({ title: 'VueJS' })
    if (vuePost && !vuePost.comments.some((commentId) => commentId.equals(bobComment._id))) {
      vuePost.comments.push(bobComment._id)
    }

    // Lab 13 / Lucid version
    // await Comment.updateOrCreate(
    //   { postId: 2, poster: 'Charlie' },
    //   { comment: 'Looking forward to more AdonisJS content.' }
    // )
    const charlieComment = await Comment.findOneAndUpdate(
      { poster: 'Charlie', comment: 'Looking forward to more AdonisJS content.' },
      { poster: 'Charlie', comment: 'Looking forward to more AdonisJS content.' },
      { upsert: true, new: true }
    )
    if (vuePost && !vuePost.comments.some((commentId) => commentId.equals(charlieComment._id))) {
      vuePost.comments.push(charlieComment._id)
      await vuePost.save()
    }
  }
}
