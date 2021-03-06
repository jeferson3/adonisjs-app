'use strict'
const Product = use('App/Models/Product')

class Cart {
  register(Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)
  }
  async save(id, qtd, response, session) {
    var sessionCart = session.get('cart');
    var product = await Product.find(id);
    if (!product) {
      return response.redirect('back')
    }
    var { name, price } = product;
    var data = {
      name,
      price,
      qtd,
      amount: parseFloat(price * qtd).toFixed(2)
    }

    if (sessionCart == null) {
      session.put('cart', [data])
    }
    else {
      if (sessionCart.find(e => e.name == name)) {
        var index = 0;
        sessionCart.forEach(p => {
          if (p.name == name) {
            p.qtd = parseInt(p.qtd) + qtd
            p.amount = parseFloat(parseInt(p.qtd) * p.price).toFixed(2)
            sessionCart[index] = p
            session.put('cart', sessionCart)
          }
          index += 1;
        });
      }

      else {
        sessionCart.push(data)
        session.put('cart', sessionCart)
      }

    }
  }

}

module.exports = Cart
