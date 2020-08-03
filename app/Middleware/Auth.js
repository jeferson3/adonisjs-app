'use strict'

const Response = require('@adonisjs/framework/src/Response')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    if(await auth.user){
      if(auth.user.type == 'admin'){
        
        return await next()
      }
    }
    return response.route('welcome');
  }
}

module.exports = Auth
