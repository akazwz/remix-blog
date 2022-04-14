import React from 'react'
import { useActionData } from '@remix-run/react'
import { register } from '~/utils/session.server'
import { badRequest } from '~/utils/http-response.server'
import { FormUsernamePwd, validatePassword, validateUsername } from '~/routes/auth/common'

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type { ActionDataProps, Fields, } from '~/routes/auth/common'
import { redirect } from '@remix-run/node'

export const loader: LoaderFunction = () => {
  return redirect('/auth/register-not-allowed')
}

export const action:ActionFunction = async ({ request }) => {
	/*const form = await request.formData()
	const username = form.get('username')
	const password = form.get('password')
	const fields = { username, password }
	const fieldErrors:Fields = {
		username: validateUsername(username),
		password: validatePassword(password),
	}

	if (typeof password !== 'string' || typeof username != 'string') {
		return badRequest({ fieldErrors, fields })
	}

	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({ fieldErrors, fields })
	}

	const user = await register({ username, password })

	if (!user) {
		fieldErrors.username = 'Register Error'
		return badRequest({
			fields, fieldErrors,
		})
	}
*/
	return redirect('/auth/register-not-allowed')
}

const Register:React.FC = () => {
	const data = useActionData<ActionDataProps>()

	return (
		<div className="auth-container">
			<div className="page-header">
				<h1>Register</h1>
			</div>
			<FormUsernamePwd data={data}/>
		</div>
	)
}

export default Register