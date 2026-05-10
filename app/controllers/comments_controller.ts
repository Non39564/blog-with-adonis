import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'

export default class CommentsController {
  async index({ params, view }: HttpContext) {
    const postId = params.postId
    // Lab 13 / Lucid version
    // const post = await Post.find(postId)
    // await post?.load('comments')
    const post = await Post.findById(postId).populate('comments')
    return view.render('comments/comments', { post: post })
  }

  async store({ params, request, response }: HttpContext) {
    const postId = params.postId
    // const data = request.all()

    const payload = await request.validateUsing(createCommentValidator)

    if (payload.poster && payload.comment) {
      // Lab 13 / Lucid version
      // await Comment.create({
      //     postId: postId,
      //     poster: payload.poster,
      //     comment: payload.comment
      // })
      const post = await Post.findById(postId)
      if (post) {
        const comment = new Comment({
          poster: payload.poster,
          comment: payload.comment,
        })
        await comment.save()
        post.comments.push(comment._id)
        await post.save()
      }
    }

    response.redirect().toRoute('comments.index', { postId: postId })
  }
}
