'use strict'
const Cart = use('App/Models/Traits/Cart')


class CartController {
    async index({ view, session }) {
        return view.render('cart', { 'cart': session.get('cart') })
    }
    async store({ request, response, session }) {
        const cart = new Cart()
        var { product_id, qtd } = request.all();
        var id = parseInt(product_id);
        var qtd = parseInt(qtd);

        if (isNaN(id) || isNaN(qtd) || qtd < 1 || typeof qtd != 'number' || typeof id != 'number') {
            return response.redirect('back')
        }
        await cart.save(id, qtd, response, session)
    }

    async destroy({ response, request, session, params }) {
        var { name } = request.all();
        var sessionCart = session.get('cart')
        if (!name) {
            session.forget('cart')
        } else {
            let index=0;
            sessionCart.forEach(e => {
                if(e.name == name){
                    sessionCart.splice(index, 1);
                }
                index += 1;
            });
        }
        return response.redirect('back')
        
    }
}

module.exports = CartController
