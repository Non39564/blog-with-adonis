import vine from '@vinejs/vine'

const schema = vine.object({
    title: vine.string().trim().minLength(1),
    body: vine.string().trim().minLength(1),
})

export const createFormValidator = vine.compile(schema)