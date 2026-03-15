import vine from '@vinejs/vine'

/**
 * Validates the comment creation action
 */
export const createCommentValidator = vine.compile(
  vine.object({
    poster: vine.string().maxLength(15),
    comment: vine.string().trim().minLength(1),
  })
)
