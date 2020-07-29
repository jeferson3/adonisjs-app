'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product')
const Image = use('App/Models/Traits/Image')
const Helpers = use('Helpers')

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    var page = isNaN(request.get().page) ? '1' : request.get().page;
    var products = await Product.query().paginate(page, 10);
    var pagination = products.pages;
    return view.render('admin.products.index', { 'products': products.toJSON().data, pagination })
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render('admin.products.create')
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    var image = new Image()

    var product = request.except('_csrf')
    product.price = product.price.replace(',', '.').replace(' ', '').replace('R$', '');
    var prod = await Product.create(product);

    if (request.file('images')) {
      image.save(prod, request)
    }
    return response.route('products.index');
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    var { id } = params;
    var product = await Product.query().where('id', id).with('images').first()
    return view.render('admin.products.show', { 'product': product.toJSON() })
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    var { id } = params;
    var product = await Product.query().where('id', id).with('images').first()
    return view.render('admin.products.edit', { 'product': product.toJSON() })
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    var image = new Image()
    var { id } = params;
    var newProduct = request.except(['_csrf', '_method']);

    if (id || request.get()._method == 'PUT' || newProduct.name != '' || newProduct.price != '' || newProduct.description != '') {

      newProduct.price = newProduct.price.replace(',', '.').replace(' ', '').replace('R$', '');

      await Product.query().where('id', id).update(newProduct);
      if (request.file('images')) {
        image.save(await Product.find(id), request)
      }
    }
    return response.route('products.index');
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    var referer = request.headers().referer;
    if (id || request.get()._method == 'DELETE') {
      var { id } = params;
      var product = await Product.findOrFail(id);
      await product.delete()
      return response.redirect(referer);
    }
    return response.route('products.index');
  }
}

module.exports = ProductController
