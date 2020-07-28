'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
var Helpers = use('Helpers')
var Product = use('App/Models/Product')

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
    var product = request.except('_csrf')
    product.price = product.price.replace(',', '.').replace(' ', '').replace('R$', '');
    var prod = await Product.create(product);

    if (request.file('images')) {
      var productIages = request.file('images', {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']

      });

      await productIages.moveAll(Helpers.tmpPath('uploads'), (file) => {
        return {
          name: `${Date.now()}.${file.extname}`
        }
      })

      if (!productIages.movedAll()) {
        return productIages.error()
      }
      var images = productIages.movedList().map(data => {
        return {photo:data.fileName}
      })

      await prod.images().createMany(images)
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
    var product = await Product.findOrFail(id)
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
    var { id } = params;
    var newProduct = request.except(['_csrf', '_method']);

    if (id || request.get()._method == 'PUT' || newProduct.name != '' || newProduct.price != '' || newProduct.description != '') {

      newProduct.price = newProduct.price.replace(',', '.').replace(' ', '').replace('R$', '');

      await Product.query().where('id', id).update(newProduct);
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
