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
    // Factory.model('App/Models/Product').createMany(5)
    
    // Factory.model('App/Models/Category').createMany(5)
    
    // User.create({
    //   username: 'jeferson',
    //   email: 'jeferson@email.com',
    //   password: '123456',
    //   fullname:'José Jeferson Lopes Gomes',
    //   address:'Vila São José, 21',
    //   city:'Ingazeira-PE',
    //   state:'Pernambuco',
    //   zipcode:'56830-000'

    // })
  }
}

module.exports = ProductsTableSeeder
