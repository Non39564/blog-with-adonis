import router from '@adonisjs/core/services/router'
import CommentsController from '#controllers/comments_controller'
import { middleware } from '#start/kernel'

router.get('/comments/:postId', [CommentsController, 'index']).as('comments.index')
router.post('/comments/:postId', [CommentsController, 'store']).use(middleware.myAuth()).as('comments.store')