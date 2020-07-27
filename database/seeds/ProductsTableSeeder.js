'use strict'

/*
|--------------------------------------------------------------------------
| ProductsTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Product = use('App/Models/Product')
const User = use('App/Models/User')

class ProductsTableSeeder {
  async run () {
    Factory.model('App/Models/Product').createMany(10)
    User.create({
      username: 'jeferson',
      email: 'jeferson@email.com',
      password: '123456'

    })
  }
}

module.exports = ProductsTableSeeder
