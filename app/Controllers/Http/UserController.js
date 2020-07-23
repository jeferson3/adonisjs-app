'use strict'

var User = use('App/Models/User')

class UserController {

    async login({ request, response, auth }) {
        var { email, password } = request.all();

        await auth.attempt(email, password);

        return 'Logged succeful'
    }
    async register({ request, response, auth }) {
        var { username, email, password } = request.all();

    }


    async logout({ response, auth }) {

        auth.logout();

        return response.route('welcome');
    }

}

module.exports = UserController
