import { useActionData } from '@remix-run/react'
import { redirect } from '@remix-run/node'

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { ActionDataProps, Fields, } from '~/routes/auth/common'

import { createUserSession, getUser, login } from '~/utils/session.server'
import { badRequest } from '~/utils/http-response.server'
import { FormUsernamePwd, validatePassword, validateUsername } from '~/routes/auth/common'

export const loader:LoaderFunction = async ({ request }) => {
	const user = await getUser(request)
	if (!user) {
		return {}
	}
	// already logged.
	return redirect('/posts')
}

export const action:ActionFunction = async ({ request }) => {
	const form = await request.formData()
	const username = form.get('username')
	const password = form.get('password')
	const fields = { username, password }
	const fieldErrors:Fields = {
		username: validateUsername(username),
		password: validatePassword(password),
	}
	if (typeof username != 'string' || typeof password !== 'string') {
		return badRequest({ fieldErrors, fields })
	}
	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({ fieldErrors, fields })
	}

	const user = await login({ username, password })

	if (!user) {
		fieldErrors.username = 'Invalid credentials'
		return badRequest({
			fields, fieldErrors,
		})
	}

	return createUserSession(user.id, '/posts')
}

const Login = () => {
	const data = useActionData<ActionDataProps>()
	return (
		<div className="auth-container">
			<div className="page-header">
				<h1>Login</h1>
			</div>
			<FormUsernamePwd data={data} />
		</div>
	)
}

export default Login