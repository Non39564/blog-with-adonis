/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import PostsController from '#controllers/posts_controller'

import './routes/post.js'
import './routes/comment.js'
import Post from '#models/form'

router.on('/').redirect('/posts')

router.get('/posts', [PostsController, 'index']).as('posts.home')
router.get('/posts/create', [PostsController, 'create']).as('posts.create')
router.post('/posts', [PostsController, 'store']).as('posts.store')
router.get('/posts/:id', [PostsController, 'show']).as('posts.show')
router.get('/posts/:id/edit', [PostsController, 'edit']).as('posts.edit')
router.post('/posts/:id/update', [PostsController, 'update']).as('posts.update')
router.get('/posts/:id/delete', [PostsController, 'destroy']).as('posts.delete')

router.get('/query', async () => {
  const post = await Post.query().where('id', 1).first()
  return post?.title
})