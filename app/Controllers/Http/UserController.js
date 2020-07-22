'use strict'

class UserController {

    async login({ request, response, auth })
    {
        var { email, password } = request.all();
        var user = auth.attempt({ email, password });

    }
    async register({ request, response, auth })
    {
        var { username, email, password } = request.all();
        
    }


    authenticate({})
    {

        console.log('register');
    }

}

module.exports = UserController
