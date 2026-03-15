import { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'

export default class CommentsController {
  async store({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(createCommentValidator)

    await Comment.create({
      postId: params.id,
      ...payload,
    })

    return response.redirect().back()
  }
}