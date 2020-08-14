'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product')
const Category = use('App/Models/Category')
const Image = use('App/Models/Traits/Image')

const Database = use('Database')
// const trx = await Database.beginTransaction()

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

    var categories = await Category.all();
    return view.render('admin.products.create', { 'categories': categories.toJSON() })
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    var image = new Image()
    var messageData = {
      message:'Produto criado com sucesso',
      type:'success'
    }
    var product = request.except(['_csrf', 'category'])
    var categories = request.all().category;
    product.price = product.price.replace(' ', '').replace('.', '').replace('R$', '')

    product.price = product.price.replace('R$', '').replace(' ', '').replace(',', '.')
    product.price = parseFloat(product.price).toFixed(2)
    var prod = await Product.create(product);

    if (!prod) {
      return response.redirect('back');
    }

    if (categories) {
      await prod.categories().attach(categories);
    }

    if (request.file('images')) {
      image.save(prod, request)
    }
    session.flash({ message: messageData })

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

    if (!product) {
      return response.route('welcome')
    }
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
    var allCategories = await Category.all();
    var product = await Product.query().where('id', id).with('images').first()
    if (!product) {
      return response.route('welcome')
    }
    var categories = await Product.query().where('id', id).with('categories').first()
    categories = categories.toJSON().categories
    let nameCategories = []
    if (categories) {
      categories.forEach(e => {
        nameCategories.push(e.name)
      });
    }
    product.price = parseFloat(product.price).toFixed(2)
    product.price = 'R$ ' + product.toJSON().price.toString().replace('.', ',')
    // return product
    return view.render('admin.products.edit', { 'product': product.toJSON(), 'categories': allCategories.toJSON(), 'prodCategories': categories, nameCategories })
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, session, request, response }) {
    var image = new Image()

    var { id } = params;
    var newProduct = request.except(['_csrf', '_method', 'category'])
    var categories = request.all().category;
    var data = {
      message:'Produto atualizado com sucesso',
      type: 'success'
    }

    if (id || request.get()._method == 'PUT' || newProduct.name != '' || newProduct.price != '' || newProduct.description != '') {

      newProduct.price = newProduct.price.replace('R$', '').replace(' ', '').replace(',', '.')
      newProduct.price = parseFloat(newProduct.price).toFixed(2)

      var product = await Product.query().where('id', id).update(newProduct);
      if (!product) {
        return response.route('welcome')
      }
      if (categories) {
        let prod = await Product.find(id)
        await prod.categories().detach()
        await prod.categories().attach(categories);
      }

      if (request.file('images')) {
        image.save(await Product.find(id), request)
      }
    }
    session.flash({ message: data })

    return response.redirect('back');
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, session, request, response }) {
    var image = new Image()
    var dataMessage = {
      message:'Produto deletado com sucesso',
      type: 'success'
    }
    if (id || request.get()._method == 'DELETE') {
      var { id } = params;
      var product = await Product.query().where('id',id).with('images').first();
      if (!product) {
        return response.route('welcome')
      }
      var images = product.toJSON().images;
      if(images != ''){
        await image.delete(images)
        
      }
      // return images;
      await product.delete()

      session.flash({ message: dataMessage })
    }
    return response.route('products.index');
  }
}
module.exports = ProductController
