'use strict'

var Product = use('App/Models/Product');

class HomeController {
    async index({view})
    {
        var products = await Product.all()
        return view.render('welcome', {'products': products.toJSON()});
    }

    async show({ view, params })
    {
        var {id} = params;
        var product = await Product.find(id);
        return view.render('single', {'product': product.toJSON()});
    }
}

module.exports = HomeController
