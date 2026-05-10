import { model, Schema } from 'mongoose'

// Lab 13 / Lucid model version
// import { DateTime } from 'luxon'
// import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
// import  type { HasMany } from '@adonisjs/lucid/types/relations'
// import Comment from './comment.js'
//
// export default class Post extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: number
//
//   @column()
//   declare title: string
//
//   @column()
//   declare body: string
//
//   @column()
//   declare userId: number
//
//   @hasMany(() => Comment)
//   declare comments: HasMany<typeof Comment>
//
//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime
//
//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime
// }

const Post = model(
  'Post',
  new Schema(
    {
      title: String,
      body: String,
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    { timestamps: true }
  )
)

export default Post
