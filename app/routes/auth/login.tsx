import {Form, useActionData} from "@remix-run/react";
import {ActionFunction} from "@remix-run/node";
import {createUserSession, login} from "~/utils/session.server";
import {badRequest} from "~/utils/http-response.server";

const validateUsername = (username: any) => {
    if (typeof username !== 'string' || username.length < 3) {
        return 'Username must be at least 3 characters'
    }
}

const validatePassword = (password: any) => {
    if (typeof password !== 'string' || password.length < 3) {
        return 'Password must be at least 3 characters'
    }
}

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')

    console.log(username)
    console.log(password)

    const fields = {username, password}

    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
    }

    if (typeof username != 'string' || typeof password !== 'string') {
        return badRequest({fieldErrors, fields})
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({fieldErrors, fields})
    }

    const user = await login({username, password})

    if (!user) {
        fieldErrors.username = 'Invalid credentials'
        return badRequest({
            fields, fieldErrors,
        })
    }

    return createUserSession(user.id, '/posts')
}

const Login = () => {
    const data = useActionData()
    console.log(data)

    return (
        <div className="auth-container">
            <div className="page-header">
                <h1>Login</h1>
            </div>

            <div className="page-container">
                <Form method="post">
                    <div className='form-control'>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                        />
                    </div>

                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                        />
                    </div>

                    <button className="btn btn-block">Submit</button>
                </Form>
            </div>
        </div>
    )
}

export default Login