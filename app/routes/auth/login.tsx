import {Form, useActionData} from "@remix-run/react";
import type {ActionFunction} from "@remix-run/node";
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

type Fields = {
    username?: string
    password?: string
}

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')

    const fields = {username, password}

    const fieldErrors: Fields = {
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

type ActionDataProps = {
    fields?: Fields,
    fieldErrors?: Fields,
}

const Login = () => {
    const data = useActionData<ActionDataProps>()
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
                            defaultValue={data?.fields?.username}
                        />
                        <div className='error'>
                            {data?.fieldErrors?.username ? (
                                <p
                                    className='form-validation-error'
                                    role='alert'
                                    id='username-error'
                                >
                                    {data.fieldErrors.username}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            defaultValue={data?.fields?.password}
                        />
                        <div className='error'>
                            {data?.fieldErrors?.password ? (
                                <p
                                    className='form-validation-error'
                                    role='alert'
                                    id='password-error'
                                >
                                    {data.fieldErrors.password}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <button className="btn btn-block">Submit</button>
                </Form>
            </div>
        </div>
    )
}

export default Login