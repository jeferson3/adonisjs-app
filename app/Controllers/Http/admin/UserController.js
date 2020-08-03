'use strict'

const User = use('App/Models/User')

class UserController {
    async index({view}){
        var users = await User.query().setHidden(['password']).fetch()
        return view.render('admin.users.index', {'users':users.toJSON()})
    }
    async create({view}){
        return view.render('admin.users.create')
    }
    async store({request, response, view}){
        var user = request.except('_csrf')
        await User.create(user)
        return response.route('users.index');
    }
    async edit({view, params}){
        var {id} = params
        var user = await User.query().where('id', id).first()
        return view.render('admin.users.edit', {user})
    }
    async update({request, response, params}){
        var {id} = params
        var newUser = request.except('_csrf');
        var user = await User.query().where('id', id).first()
        user.update(newUser)
        return response.route('admin.users.index');
    }
    async destroy({request, response, params}){
        var {id} = params
        await User.query().where('id', id).delete()
        return response.route('admin.users.index');
    }
}

module.exports = UserController
