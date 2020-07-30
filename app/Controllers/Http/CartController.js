'use strict'

const Product = use('App/Models/Product')

class CartController {
    async index({ view, session }) {
        // return session.get('cart')
        return view.render('cart', {'cart': session.get('cart')})
    }
    async store({ request, response, session }) {
        var { product_id, qtd } = request.all();
        var id = parseInt(product_id);

        if (isNaN(id) || qtd < 1 || typeof id != 'number') {
            return response.redirect('back')
        }
        var product = await Product.find(id);
        if (!product) {
            return response.redirect('back')
        }
        var { name, price } = product;
        var data = {
            name,
            price,
            qtd,
            amount: price * qtd
        }
        if(session.get('cart')){
            var newData = session.get('cart')
            newData.push(data)
            session.put('cart', newData)
            return response.route('cart.index');
        }
        session.put('cart', [data])
        return response.route('cart.index');
    }
}

module.exports = CartController
