import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'

export default class PostsController {
    async index({ auth, view }: HttpContext) {
        const user = auth.getUserOrFail()

        const posts = await Post.query()
            .where('userId', user.id)
            .withCount('comments', (query) => {
                query.as('commentsCount')
            }).orderBy('id', 'desc')

        return view.render('posts', { posts: posts })
    }

    async show({ params, view }: HttpContext) {
        const id = params.id
        const post = await Post.find(id)

        return view.render('detail', { post: post })
    }

    async create({ bouncer, view }: HttpContext) {
        await bouncer.with('PostPolicy').authorize('create')
        return view.render('post')
    }

    async store({ bouncer, auth, request, response }: HttpContext) {
        await bouncer.with('PostPolicy').authorize('create')

        const user = auth.getUserOrFail()
        const payload = await request.validateUsing(createPostValidator)

        const post = new Post()
        post.userId = user.id
        post.title = payload.title
        post.body = payload.body
        await post.save()

        response.redirect().toRoute('posts.home')
    }

    async edit({ bouncer, params, view }: HttpContext) {
        const id = params.id
        const post = await Post.query()
            // .where('userId', user.id)
            .where('id', id)
            .first()

        await bouncer.with('PostPolicy').authorize('edit', post!)

        return view.render('post', { post: post })
    }

    async update({ bouncer, params, request, response }: HttpContext) {
        const id = params.id
        const post = await Post.query()
            // .where('userId', user.id)
            .where('id', id)
            .first()

        await bouncer.with('PostPolicy').authorize('update', post!)

        const payload = await request.validateUsing(createPostValidator)

        post!.title = payload.title
        post!.body = payload.body
        await post?.save()

        response.redirect().toRoute('posts.show', { id: id })
    }

    async destroy({ bouncer, params, response }: HttpContext) {
        const id = params.id
        const post = await Post.query()
            // .where('userId', user.id)
            .where('id', id)
            .first()

        await bouncer.with('PostPolicy').authorize('delete', post!)

        await post!.delete()

        response.redirect().toRoute('posts.home')
    }

    async deleteAll({ auth, request, response }: HttpContext) {
        const user = auth.getUserOrFail()
        const postIds = request.input('postIds')
        console.log(postIds)

        await user.related('posts').query().whereIn('id', postIds).delete()

        response.ok({ message: 'Posts deleted successfully' })
    }
}