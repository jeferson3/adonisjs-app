'use strict'

var Product = use('App/Models/Product');

class HomeController {
    async index({view})
    {
        var products = await Product.all()

        console.log(products.toJSON());

        return view.render('welcome', {'products': products.toJSON()});
    }
}

module.exports = HomeController
