'use strict'

var Product = use('App/Models/Product');
var Category = use('App/Models/Category');

class HomeController {
    
    async index({view, session})
    {
        var products = await Product.query().with('images').with('categories').fetch()
        return view.render('welcome', {'products': products.toJSON()});
    }

    async show({ view, params })
    {
        var {slug} = params;
        var product = await Product.query().where('slug', slug).with('images').with('categories').first();
        return view.render('single', {'product': product.toJSON()});
    }
    async category({response, params, view}){
        var {slug} = params;
        if (!slug) {
            response.route('welcome')
        }
        var products = await Category.query().with('products').where('slug', slug).first()
        var nameCategory = products.toJSON().name
        products = await products.products().with('images').with('categories').fetch()
        products = products.toJSON()
        return view.render('categories', {products, nameCategory});
    }
    async profile({view, auth}){
        var user = auth.user;
        return view.render('profile', {user})
    }
}

module.exports = HomeController
