import User from '#models/user'
import Post from '#models/post'
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
  edit(user: User, post: Post): AuthorizerResponse {
    return user.id == post.userId
  }

  /**
   * Only the post creator can update the post
   */
  update(user: User, post: Post): AuthorizerResponse {
    return user.id == post.userId
  }

  /**
   * Only the post creator can delete the post
   */
  delete(user: User, post: Post): AuthorizerResponse {
    return user.id == post.userId
  }
}
