'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */

const Category = use('App/Models/Category')

class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    var page = isNaN(request.get().page) ? '1' : request.get().page;
    var categories = await Category.query().paginate(page, 10);
    var pagination = categories.pages;
    return view.render('admin.categories.index', { 'categories': categories.toJSON().data, pagination })
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render('admin.categories.create')
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    var messageData = {
      message: 'Categoria criada com sucesso',
      type: 'success'
    }
    await Category.create(request.except('_csrf'))
    session.flash({ message: messageData })
    return response.route('categories.index')
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    var { id } = params;
    var category = await Category.query().where('id', id).first()
    return view.render('admin.categories.edit', { 'category': category })

  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {

    var { id } = params;
    var newCategory = request.except(['_csrf', '_method'])
    var data = {
      message: 'Catagoria atualizado com sucesso',
      type: 'success'
    }
    var category = await Category.query().where('id', id).update(newCategory);
    session.flash({ message: data })
    return response.redirect('back');

  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, session }) {
    var { id } = params;
    var data = {
      message: 'Catagoria deletada com sucesso',
      type: 'success'
    }
    var categorie = await Category.query().where('id', id).first();

    await categorie.delete()

    session.flash({ message: data })
    return response.route('categories.index');
  }
}

module.exports = CategoryController
