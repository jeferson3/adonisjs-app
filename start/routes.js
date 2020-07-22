'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', function({ view }) {
    return view.render('welcome');
}).as('welcome');

Route.resource('products', 'ProductController');

Route.post('login', 'UserController.login').as('login');
// Route.post('register', 'UserController@register').as('register');