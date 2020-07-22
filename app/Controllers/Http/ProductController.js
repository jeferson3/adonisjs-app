'use strict'

class ProductController {

    constructor()
    {

    }

    index({ view }) 
    {
        return view.render('products.index');
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
