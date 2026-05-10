/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/
import User from '#models/user'
// Lab 13 / Lucid version
// import Post from '#models/post'
import { Bouncer } from '@adonisjs/bouncer'

export const editPost = Bouncer.ability((_user: User, _post: unknown) => {
  // Lab 13 / Lucid version
  // return user.id === post.userId
  return true
})
