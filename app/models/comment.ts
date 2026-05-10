import { model, Schema } from 'mongoose'

// Lab 13 / Lucid model version
// import { DateTime } from 'luxon'
// import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
//
// export default class Comment extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: number
//
//   @column()
//   declare postId: number
//
//   @column()
//   declare poster: string
//
//   @column()
//   declare comment: string
//
//   @computed()
//   get postedOn(){
//     return this.createdAt.toFormat("dd LLL yyyy HH:mm")
//   }
//
//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime
//
//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime
// }

const Comment = model(
  'Comment',
  new Schema(
    {
      poster: String,
      comment: String,
    },
    { timestamps: true }
  )
)

export default Comment
