import User from '#models/user'
// Lab 13 / Lucid version
// import Post from '#models/post'
import AdminBasePolicy from './admin_base_policy.js'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class PostPolicy extends AdminBasePolicy {
  /**
   * Every logged-in user can view the list of posts
   */
  viewList(_user: User): AuthorizerResponse {
    return true
  }

  /**
   * Every logged-in user can create a post
   */
  create(_user: User): AuthorizerResponse {
    return true
  }

  /**
   * Only the post creator can edit the post
   */
  edit(_user: User, _post: unknown): AuthorizerResponse {
    // Lab 13 / Lucid version
    // return user.id == post.userId
    return true
  }

  /**
   * Only the post creator can update the post
   */
  update(_user: User, _post: unknown): AuthorizerResponse {
    // Lab 13 / Lucid version
    // return user.id == post.userId
    return true
  }

  /**
   * Only the post creator can delete the post
   */
  delete(_user: User, _post: unknown): AuthorizerResponse {
    // Lab 13 / Lucid version
    // return user.id == post.userId
    return true
  }
}
