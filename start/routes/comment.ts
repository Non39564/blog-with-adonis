import router from '@adonisjs/core/services/router'
import CommentsController from '#controllers/comments_controller'

router.get('/comments/:postId', [CommentsController, 'index']).as('comments.index')
router.post('/comments/:postId', [CommentsController, 'store']).as('comments.store')