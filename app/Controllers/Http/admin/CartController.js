'use strict'

const Product = use('App/Models/Product')

class CartController {
    async index({ view }) {
        return view.render('admin.cart')
    }
    async store({ request, response, session }) {
        var { product, qtd } = request.all();
        var product = await Product.find(product);

        if (!product || product < 1 || typeof id != 'number') {
            return response.redirect('back')
        }

        // session.push('cart', )
        return request.all()
    }
}

module.exports = CartController
