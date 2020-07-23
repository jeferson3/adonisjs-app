'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with auths
 */

var User = use('App/Models/User')

class AuthController {
  
  async index({view}) {
    return view.render('auth.index')
  }

  async login({ request, response, auth }) {
    var { email, password } = request.all();

    await auth.attempt(email, password);

    return response.route('products.index');
  }

  async register({view}){
    return view.render('auth.register')
  }

  async store({view}){
    return view.render('auth.index')
  }


  async logout({ response, auth }) {

    auth.logout();

    return response.route('welcome');
  }

  /**
   * Render a form to be used for creating a new auth.
   * GET auths/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single auth.
   * GET auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

}

module.exports = AuthController
