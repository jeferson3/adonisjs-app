'use strict'

class ProductValidator {
  get rules () {
    return {
      // validation rules
      'name': 'required|min:5|unique:products',
      'price': 'required',
      'description':'required|min:10',
    }
  }

  get messages(){
    return{
      'required': 'Este campo é obrigatório!',
      'min':'Este campo deve ter no mínimo {{argument}} caracteres!',
      'unique': 'Este produto já existe, use um nome diferente!'
    }
  }
}

module.exports = ProductValidator
