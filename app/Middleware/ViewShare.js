'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

var Category = use('App/Models/Category');

class ViewShare {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, view, session }, next) {
    // call next to advance the request
    const categories = await Category.all();
    view.share({//compartilha com todas as views os dados
      session: session.get('cart') ? session.get('cart') : '',
      menuCategories: categories.toJSON()
       
    })
    await next()
  }
}

module.exports = ViewShare
