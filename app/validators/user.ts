import vine from '@vinejs/vine'

const schema = vine.object ({
  username: vine.string().minLength(5)
                  .unique({table: 'users', column: 'username' }),
  password: vine.string().minLength(5).confirmed(),
  password_confirmation: vine.string().minLength(5)
})

export const registerUserValidator = vine.compile(schema)