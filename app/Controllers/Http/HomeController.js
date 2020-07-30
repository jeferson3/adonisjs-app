'use strict'

var Product = use('App/Models/Product');

class HomeController {
    
    async index({view})
    {
            
        var products = await Product.query().with('images').fetch()
        return view.render('welcome', {'products': products.toJSON()});
    }

    async show({ view, params })
    {
        var {slug} = params;
        var product = await Product.query().where('slug', slug).with('images').first();
        return view.render('single', {'product': product.toJSON()});
    }
}

module.exports = HomeController
