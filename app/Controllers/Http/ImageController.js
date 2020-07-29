'use strict'

const Helpers = use('Helpers')

class ImageController {
    async show({response, params})
    {
        var {photo} = params
        return response.download(Helpers.tmpPath(`uploads/${photo}`))
    }
}

module.exports = ImageController
