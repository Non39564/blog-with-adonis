/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.get('/greet/:name', async ({ params }) => {
  const { name } = params
  return 'Hello, ' + name + '!'
})

router.get('/about', async () => {
  return 'About Us'
})