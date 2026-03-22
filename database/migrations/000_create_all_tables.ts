import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.createTable('users', (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
    this.schema.createTable('forms', (table) => {
      table.increments('id')
      table.string('title', 100).notNullable()
      table.text('body')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
    this.schema.createTable('comments', (table) => {
      table.increments('id')
      table.integer('post_id').unsigned().references('id').inTable('forms').onDelete('CASCADE')
      table.string('poster')
      table.text('comment')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  public async down () {
    this.schema.dropTable('comments')
    this.schema.dropTable('forms')
    this.schema.dropTable('users')
  }
}
