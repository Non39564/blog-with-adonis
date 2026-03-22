import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'

export default class PostsController {
    async index({ auth, view }: HttpContext) {
        // ดึงข้อมูล user ที่ล็อกอิน
        const user = auth.getUserOrFail() 
        
        const posts = await Post.query()
            .where('userId', user.id) // กรองเอาเฉพาะโพสต์ของ user นี้
            .withCount('comments', (query) => {
                query.as('commentsCount')
            }).orderBy('id', 'desc') // เรียงลำดับโพสต์ล่าสุด
            
        return view.render('posts', { posts: posts })
    }

    async show({ params, view }: HttpContext) {
        const id = params.id 
        const post = await Post.find(id)

        return view.render('detail', { post: post })
    }

    async create({ view }: HttpContext) {
        return view.render('post')
    }

    async store({ auth, request, response }: HttpContext) {
        // ดึงข้อมูล user ที่ล็อกอิน
        const user = auth.getUserOrFail() 
        
        // ใช้ validateUsing ตาม Lab 9
        const payload = await request.validateUsing(createPostValidator)

        const post = new Post()
        post.userId = user.id // บันทึก userId ลงในโพสต์ด้วย
        post.title = payload.title 
        post.body = payload.body 
        await post.save()

        response.redirect().toRoute('posts.home')
    }

    async edit({ auth, params, view }: HttpContext) {
        const id = params.id 
        const user = auth.getUserOrFail() //
        
        // ค้นหาโพสต์ที่เป็นของ user คนนี้เท่านั้น
        const post = await Post.query()
            .where('userId', user.id)
            .where('id', id)
            .first() // ใช้ first() เพื่อให้คืนค่าเป็น Object เดียว

        return view.render('post', { post: post })
    }

    async update({ auth, params, request, response }: HttpContext) {
        const id = params.id 
        const user = auth.getUserOrFail() // 
        
        // ค้นหาโพสต์ที่เป็นของ user คนนี้เท่านั้น
        const post = await Post.query()
            .where('userId', user.id)
            .where('id', id)
            .first()

        // ใช้ validateUsing เหมือนตอน create
        const payload = await request.validateUsing(createPostValidator)

        post!.title = payload.title 
        post!.body = payload.body 
        await post?.save()  

        response.redirect().toRoute('posts.show', {id: id})
    }

    async destroy({ auth, params, response }: HttpContext) {
        const id = params.id 
        const user = auth.getUserOrFail() // 
        
        // ค้นหาโพสต์ที่เป็นของ user คนนี้เท่านั้น
        const post = await Post.query()
            .where('userId', user.id)
            .where('id', id)
            .first()

        await post?.delete()

        response.redirect().toRoute('posts.home')
    }
}