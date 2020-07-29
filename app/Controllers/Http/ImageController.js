'use strict'


const Helpers = use('Helpers')
const Product = use('App/Models/Product')

class ImageController {
    async show({response, params})
    {
        var {photo} = params
        return response.download(Helpers.tmpPath(`uploads/${photo}`))

    }
    async delete({response, request, params}){
        var removeFile = Helpers.promisify(require('fs').unlink)
        var referer = request.headers().referer;
        var {photo} = params
        var { id } = params;
        var product = await Product.find(id)
        removeFile(Helpers.tmpPath(`uploads/${photo}`))
        await product.images().where('photo', photo).delete()
        return response.redirect(referer);

    }
}

module.exports = ImageController
