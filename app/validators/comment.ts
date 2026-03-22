import vine from '@vinejs/vine'

const schema =  vine.object({
    poster: vine.string().maxLength(15),
    comment: vine.string()
})

export const createCommentValidator = vine.compile(schema)

  