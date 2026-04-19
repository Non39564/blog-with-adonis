import router from "@adonisjs/core/services/router";
import UsersController from "#controllers/users_controller";
import { middleware } from '#start/kernel'
import Role from "../../app/contracts/Role.js";

router.on('/login').render('login').as('login')
router.on('/register').render('register').as('register')

// router.post('/login', [UsersController, 'login2']).as('users.login')
// router.get('/logout', [UsersController, 'logout2']).as('users.logout')
router.post('/login', [UsersController, 'login']).as('users.login')
router.get('/logout', [UsersController, 'logout']).as('users.logout')
router.post('/register', [UsersController, 'register']).as('users.register')
router.post('/verify', [UsersController, 'verify']).as('users.verify')
router.get('/users/:id/destroy', [UsersController, 'destroy'])
  .as('users.destroy')
  .use(middleware.auth())
  .use(middleware.acl({ guards: [Role.ADMIN] }))