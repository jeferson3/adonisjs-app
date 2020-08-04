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
    async store({request, response, session}){
        var data = {
            message:'Usuário criado com sucesso',
            type:'success'
        }
        var user = request.except(['_csrf', '_method'])
        await User.create(user)
        session.flash({message:data})

        return response.route('users.index');
    }
    async edit({view, params}){
        var {id} = params
        var user = await User.query().where('id', id).first()
        return view.render('admin.users.edit', {user})
    }
    async update({request, response, params, session}){
        var data = {
            message:'Usuário atualizado com sucesso',
            type:'success'
        }
        var {id} = params
        var newUser = request.except(['_csrf','_method']);
        if(!newUser.password){
            newUser = request.except(['_csrf', '_method', 'password'])
        }
    
        session.flash({message:data})
        await User.query().where('id', id).update(newUser)
        return response.route('users.index');
    }
    async destroy({request, response, params, session}){
        var data = {
            message:'Usuário removido com sucesso',
            type:'success'
        }
        var {id} = params
        await User.query().where('id', id).delete()
        session.flash({message: data})
        return response.route('users.index');
    }
}

module.exports = UserController
