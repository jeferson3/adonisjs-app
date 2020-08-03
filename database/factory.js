'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Product', (faker) => {
  return {
    name: faker.sentence({words: 3}),
    description: faker.paragraph(),
    price: faker.floating({fixed:2, min: 1000, max: 10000}),
  }
})

Factory.blueprint('App/Models/Category', (faker) => {
  return {
    name: faker.sentence({words: 2}),
  }
})
