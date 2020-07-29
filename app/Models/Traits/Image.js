'use strict'
const Helpers = use('Helpers')
const { v4:uuidv4 } = require('uuid'); //npm install uuid

class Image {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)
  }
  /** 
   * Save a new image for product
   * @param prod
   * @param request
  **/
  async save(prod, request){
    var productIages = request.file('images', {
      types: ['image'],
      size: '2mb',
      extnames: ['png', 'jpg', 'jpeg']

    });
  

    await productIages.moveAll(Helpers.tmpPath('uploads'), (file) => {
      return {
        name: `${ uuidv4() }-${new Date().getTime()}.${file.extname}`
      }
    })

    if (!productIages.movedAll()) {
      return productIages.error()
    }
    var images = productIages.movedList().map(data => {
      return {photo:data.fileName}
    })

    await prod.images().createMany(images)
  }

  async delete()
  {
    return 'teste'
  }
}

module.exports = Image
