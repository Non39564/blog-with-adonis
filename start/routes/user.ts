import { HttpContext } from '@adonisjs/core/http'
import router from "@adonisjs/core/services/router";
import UsersController from "#controllers/users_controller";
import { middleware } from "#start/kernel";

router.get('/login', ({view}:HttpContext) => {
  return view.render('login')
}).use(middleware.guest()).as('login')

router.post('/login', [UsersController, 'login']).as('users.login')
router.get('/logout', [UsersController, 'logout']).as('users.logout')