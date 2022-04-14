import React from 'react'
import { Link } from '@remix-run/react'
import { redirect } from '@remix-run/node'

import type { LoaderFunction, } from '@remix-run/node'
import { getUser } from '~/utils/session.server'

export const loader:LoaderFunction = async ({ request }) => {
	const user = await getUser(request)
	if (!user) {
		return redirect('/auth/login')
	}
}

const AdminPage:React.FC = () => {
	return (
		<div>
			<Link to="/posts/new" className="btn">
				New Post
			</Link>
		</div>
	)
}

export default AdminPage