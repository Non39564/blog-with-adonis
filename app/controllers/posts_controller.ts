import type { HttpContext } from '@adonisjs/core/http'

interface Post {
  id: number;
  title: string;
  body: string;
}

const posts: Post[] = [
  { id: 1, title: 'Hello AdonisJS', body: 'Adonis includes everything you need to create fully functional web app or an API server.' },
  { id: 2, title: 'VueJS', body: 'Vue is a progressive framework for building user interfaces.' }
]

export default class PostsController {
  async index({ view }: HttpContext) {
    return view.render('posts', { posts: posts })
  }

  async show({ params, view }: HttpContext) {
    const id = params.id
    const post = posts.find((p) => p.id == Number(id))
    return view.render('detail', { post: post })
  }

  async create({ view }: HttpContext) {
    return view.render('create')
  }

  async store({ request, response }: HttpContext) {
    const title = request.input('title')
    const body = request.input('body')
    const newId = posts.length + 1
    const newPost: Post = { id: newId, title: title, body: body }
    posts.push(newPost)
    return response.redirect().toPath('/posts')
  }

  async edit({ params, view }: HttpContext) {
    const id = params.id
    const post = posts.find(p => p.id == Number(id))
    return view.render('edit', { post: post })
  }

  async update({ params, request, response }: HttpContext) {
    const id = params.id
    const index = posts.findIndex(p => p.id == Number(id))
    posts[index].title = request.input('title')
    posts[index].body = request.input('body')
    return response.redirect().toPath('/posts/' + id)
  }

  async destroy({ params, response }: HttpContext) {
    const id = params.id
    const index = posts.findIndex(p => p.id == Number(id))
    if (index !== -1) { posts.splice(index, 1) }
    return response.redirect().toPath('/posts')
  }
}