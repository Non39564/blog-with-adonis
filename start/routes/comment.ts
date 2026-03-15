import router from '@adonisjs/core/services/router'
const CommentsController = () => import('#controllers/comments_controller')

router.post('/posts/:id/comments', [CommentsController, 'store']).as('comments.store')
