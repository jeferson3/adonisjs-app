'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterTypeUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.enu('type', ['admin', 'normal']).notNullable().defaultTo('normal')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('type')
    })
  }
}

module.exports = AlterTypeUserSchema
