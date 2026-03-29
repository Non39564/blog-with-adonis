import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import Comment from '#models/comment'
import { createCommentValidator } from '#validators/comment'

export default class CommentsController {
    async index({params, view}: HttpContext) {
        const postId = params.postId
        const post = await Post.find(postId)
        await post?.load('comments')
        return view.render('comments/comments', { post: post })
    }

    async store({params, request, response}: HttpContext) {
        const postId = params.postId
        // const data = request.all() 
       
        const payload = await request.validateUsing(createCommentValidator)

        if (payload.poster && payload.comment) {
            await Comment.create({
                postId: postId,
                poster: payload.poster,
                comment: payload.comment
            })
        }

        response.redirect().toRoute('comments.index', {postId: postId})
    }
}

