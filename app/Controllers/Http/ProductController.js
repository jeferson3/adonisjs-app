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

    async show({ view, params })
    {
        var {id} = params;
        var product = await Product.find(id);
        return view.render('products.show', {'product': product.toJSON()});
    }
}

module.exports = ProductController
