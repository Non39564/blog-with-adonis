import type { HttpContext } from '@adonisjs/core/http'
import Form from '#models/form';
import { createFormValidator } from '#validators/form';

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// const posts: Post[] = [
//   { id: 1, title: 'Hello AdonisJS', body: 'Adonis includes everything you need to create fully functional web app or an API server.' },
//   { id: 2, title: 'VueJS', body: 'Vue is a progressive framework for building user interfaces.' }
// ]

export default class PostsController {
  async index({ view }: HttpContext) {
    const posts = await Form.query().withCount('comments', (query) => {
      query.as('commentsCount')
    })
    return view.render('posts', { posts: posts })
  }

  async show({ params, view }: HttpContext) {
    const id = params.id
    const post = await Form.findOrFail(id)
    await post.load('comments', (query) => {
      query.orderBy('createdAt', 'desc')
    })
    return view.render('detail', { post: post })
  }

  async create({ view }: HttpContext) {
    return view.render('form')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createFormValidator)

    const post = new Form()
    post.title = payload.title
    post.body = payload.body
    await post.save()
    return response.redirect().toRoute('posts.home')
  }

  async edit({ params, view }: HttpContext) {
    const id = params.id
    const post = await Form.find(id)
    return view.render('form', { post: post })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(createFormValidator)
    const id = params.id
    const post = await Form.findOrFail(id)
    post.title = payload.title
    post.body = payload.body
    await post.save()
    return response.redirect().toRoute('posts.show', { id: id })
  }

  async destroy({ params, response }: HttpContext) {
    const id = params.id
    const post = await Form.find(id)
    await post?.delete()
    return response.redirect().toRoute('posts.home')
  }
}