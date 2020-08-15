'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
var Env = use('Env')

class Image extends Model {

    // static get computed () {
    //     return ['url']
    //   }

    //   getUrl ({ photo }) {
    //     return `${Env.get('APP_URL')}/images/${photo}`
    //   }

    products() {
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = Image
