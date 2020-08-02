'use strict'

const User = use('App/Models/User')

class UserController {
    async index({view}){
        var users = await User.query().setHidden(['password']).fetch()
        return view.render('admin.users.index', {'users':users.toJSON()})
    }
}

module.exports = UserController
