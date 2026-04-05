import PostsController from '#controllers/posts_controller'
import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
import { middleware } from '#start/kernel'


router.get('/', ({response}: HttpContext) => {
    response.redirect().toRoute('posts.home')
})

router.group(() => {
    router.get('/posts', [PostsController, 'index']).as('posts.home')
    router.get('/posts/create', [PostsController, 'create']).as('posts.create')
    router.get('/posts/:id/edit', [PostsController, 'edit']).as('posts.edit')
    router.get('/posts/:id/delete', [PostsController, 'destroy']).as('posts.delete')
    router.post('/posts', [PostsController, 'store']).as('posts.store')
    router.post('/posts/:id/update', [PostsController, 'update']).as('posts.update')
    router.post('/posts/delete-all', [PostsController, 'deleteAll']).as('posts.deleteAll')
// }).use(middleware.myAuth())
}).use(middleware.auth())

router.get('/posts/:id', [PostsController, 'show']).as('posts.show')