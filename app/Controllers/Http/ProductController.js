'use strict'

var Product = use('App/Models/Product');

class ProductController {


    constructor()
    {

    }

    async index({ request, view, params }) 
    {
        var query = request.get('page');
        var page = query.page;
        var products = await Product.query().paginate(page, 10);        
        var pagination = products.pages;
        console.log(pagination);
        return view.render('products.index', { 'products': products.toJSON(), pagination });
    }

    store({ request })
    {
        return request.all();
    }

    edit({ view, params, compact })
    {
        var { id } = params;

        return view.render('products.edit', { id });
    }
}

module.exports = ProductController
