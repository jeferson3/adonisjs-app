'use strict'

class ProductValidator {
  get rules() {
    const { id } = this.ctx.params
    var data = id ? `name, id, ${id}` : 'name';
    return {
      // validation rules
      'name': `required|min:5|unique:products, ${data}`,
      'price': 'required',
      'description': 'required|min:10',
      'category': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Este campo é obrigatório!',
      'min': 'Este campo deve ter no mínimo {{argument}} caracteres!',
      'unique': 'Este produto já existe, use um nome diferente!'
    }
  }
}

module.exports = ProductValidator
