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


Route.get('/', 'HomeController.index').as('welcome');

Route.group('', function() {

    Route.get('login', 'AuthController.index').as('index');
    Route.get('register', 'AuthController.registerIndex').as('register');


    Route.post('register', 'AuthController.register').as('');

    Route.post('login', 'AuthController.login').as('auth');
    Route.post('logout', 'AuthController.logout').as('logout');

}).as('login');

Route.resource('products', 'ProductController').middleware('auth');


