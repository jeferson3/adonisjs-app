'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ViewShare {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, view, session }, next) {
    // call next to advance the request
    view.share({
      session: session.get('cart') ? session.get('cart') : '' //compartilha com todas as views a session
    })
    await next()
  }
}

module.exports = ViewShare
