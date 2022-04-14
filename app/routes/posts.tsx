import React from 'react'
import { Outlet } from '@remix-run/react'

const Posts:React.FC = () => {
	return (
		<>
			<Outlet/>
		</>
	)
}

export default Posts