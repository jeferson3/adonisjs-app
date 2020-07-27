'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static  boot  ( )  { 
        super . boot ( )

        isso . addTrait ( '@provider: Lucid / Slugify' ,  { 
          fields : {  slug : 'name'  } , 
          estratégia : 'dbIncrement' , 
          disableUpdates : false 
        } ) 
      } 

    images(){
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Product
