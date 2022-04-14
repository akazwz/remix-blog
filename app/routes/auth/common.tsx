import React from 'react'
import { Form } from '@remix-run/react'

export const validateUsername = (username:any) => {
	if (typeof username !== 'string' || username.length < 3) {
		return 'Username must be at least 3 characters'
	}
}

export const validatePassword = (password:any) => {
	if (typeof password !== 'string' || password.length < 3) {
		return 'Password must be at least 3 characters'
	}
}

export type Fields = {
	username?:string
	password?:string
}

export type ActionDataProps = {
	fields?:Fields,
	fieldErrors?:Fields,
}

interface IProps{
	data:any
}

export const FormUsernamePwd = ({ data }:IProps) => {
	return (
		<div className="page-container">
			<Form method="post">
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						defaultValue={data?.fields?.username}
					/>
					<div className="error">
						{data?.fieldErrors?.username ? (
							<p
								className="form-validation-error"
								role="alert"
								id="username-error"
							>
								{data.fieldErrors.username}
							</p>
						) : null}
					</div>
				</div>

				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						defaultValue={data?.fields?.password}
					/>
					<div className="error">
						{data?.fieldErrors?.password ? (
							<p
								className="form-validation-error"
								role="alert"
								id="password-error"
							>
								{data.fieldErrors.password}
							</p>
						) : null}
					</div>
				</div>
				<button className="btn btn-block">Submit</button>
			</Form>
		</div>
	)
}