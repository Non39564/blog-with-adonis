import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'

export default class PostsController {
    async index( { view }: HttpContext ) {
        const posts = await Post.query()
                                .withCount('comments', (query) => {
                                    query.as('commentsCount')
                                })                 
        return view.render( 'posts', { posts: posts } )
    }

    async show( { params, view }: HttpContext ) {
        const id = params.id 
        const post = await Post.find( id )

        return view.render( 'detail', { post: post } )
    }

    async create( { view }: HttpContext ) {
        return view.render( 'post' )
    }

    async store( { request, response }: HttpContext ) {
        // const title = request.input( 'title' )
        // const body = request.input( 'body' )
        const data = request.all() 
        const payload = await createPostValidator.validate(data)

        const post = new Post()
        post.title = payload.title 
        post.body = payload.body 
        await post.save()

        response.redirect().toRoute('posts.home')
    }

    async edit( { params, view }: HttpContext ) {
        const id = params.id 
        const post = await Post.find( id )

        return view.render( 'post', { post: post } )
    }

    async update( { params, request, response }: HttpContext ) {
        const id = params.id 
        const post = await Post.find( id )

        post!.title = request.input( 'title' )
        post!.body = request.input( 'body' )
        await post!.save()  
        // if ( post ) {
        //     post.title = request.input( 'title' )
        //     post.body = request.input( 'body' )
        //     await post.save()  
        // }

        response.redirect().toRoute('posts.show',{id: id})
    }

    async destroy( { params, response }: HttpContext ) {
        const id = params.id 
        const post = await Post.find( id )

        await post!.delete()
        // if ( post ) {
        //     await post.delete()
        // }

        response.redirect().toRoute('posts.home')
    }
}