'use strict'

class ProductValidator {
  get rules () {
    return {
      // validation rules
      'name': 'required|min:5',
      'price': 'required',
      'description':'required|min:10',
    }
  }

  get messages(){
    return{
      'required': 'Este campo é obrigatório!',
      'min':'Este campo deve ter no mínimo {{argument}} caracteres!'

    }
  }
}

module.exports = ProductValidator
