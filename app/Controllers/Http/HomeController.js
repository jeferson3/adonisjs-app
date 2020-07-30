'use strict'

var Product = use('App/Models/Product');

class HomeController {
    
    async index({view, session})
    {
        var countCart = session.get('cart').length
        var products = await Product.query().with('images').fetch()
        return view.render('welcome', {'products': products.toJSON(), countCart});
    }

    async show({ view, params })
    {
        var {slug} = params;
        var product = await Product.query().where('slug', slug).with('images').first();
        return view.render('single', {'product': product.toJSON()});
    }
}

module.exports = HomeController
