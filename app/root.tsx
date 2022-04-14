import React from 'react'
import {
	Meta,
	Links,
	Outlet,
	Scripts,
	useCatch,
	useLoaderData,
	ScrollRestoration,
	LiveReload,
	NavLink,
	Form,
} from '@remix-run/react'

import type { ReactNode } from 'react'
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import type { ErrorBoundaryComponent } from '@remix-run/node'
import type { CatchBoundaryComponent } from '@remix-run/react/routeModules'

import globalStylesUrl from './styles/gloabal.css'
import { getUser } from '~/utils/session.server'

export const links:LinksFunction = () => [
	{ rel: 'stylesheet', href: globalStylesUrl },
]

export const meta:MetaFunction = () => {
	const description = 'A cool blog built with Remix'
	const keywords = 'remix, react, javascript, typescript,'

	return {
		description,
		keywords,
	}
}

// error boundary
export const ErrorBoundary:ErrorBoundaryComponent = ({ error }) => {
	return (
		<Document>
			<ErrorLayout>
				<h1>Error</h1>
				<p>{error.message}</p>
			</ErrorLayout>
		</Document>
	)
}

// catch boundary
export const CatchBoundary:CatchBoundaryComponent = () => {
	const caught = useCatch()
	return (
		<Document>
			<ErrorLayout>
				<h1>{caught.status} {caught.statusText}</h1>
			</ErrorLayout>
		</Document>
	)
}

export const loader:LoaderFunction = async ({ request }) => {
	const user = await getUser(request)
	return {
		user,
	}
}

export default function App () {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	)
}

interface IDocument{
	children:ReactNode,
	title?:string,
}

function Document ({ children, title }:IDocument) {
	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			{typeof document === 'undefined' ? '__STYLES__' : null}
			<Meta />
			<Links />
			<title>{title ?? 'AKAZWZ'}</title>
		</head>
		<body>
		{children}
		<ScrollRestoration />
		<Scripts />
		{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
		</body>
		</html>
	)
}

interface ILayout{
	children:ReactNode,
}

const ErrorLayout = ({ children }:ILayout) => {
	return (
		<>
			<nav className="navbar">
				<NavLink to="/" className="logo">
					<img src={'/logo.png'} alt="logo" width="32px" height="32px" />
					AKAZWZ
				</NavLink>
				<ul className="nav">
					<li>
						<NavLink
							to="/posts"
							style={({ isActive }) => {
								console.log(isActive ? 'dd' : 'ddd')
								return {}
							}}
						>
							Posts
						</NavLink>
					</li>
				</ul>
			</nav>
			<div
				style={{
					height: '70vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>{children}</div>
		</>
	)
}

function Layout ({ children }:ILayout) {
	const { user } = useLoaderData()

	const activeStyle = {
		color: '#578cfa'
	}

	return (
		<>
			<nav className="navbar">
				<div style={{
					maxWidth: '1280px',
					width: '100%',
					margin: '0 auto',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
					<NavLink to="/" className="logo" style={({ isActive }) => isActive ? activeStyle : {}}>
						<img src={'/logo.png'} alt="logo" width="32px" height="32px" />
						AKAZWZ
					</NavLink>
					<ul className="nav">
						<li>
							<NavLink
								to="/posts"
								style={({ isActive }) => isActive ? activeStyle : {}}
							>
								Posts
							</NavLink>
						</li>
						{user ? (
							<>
								<li>
									<NavLink to="/posts/new">
										New Post
									</NavLink>
								</li>

								<li>
									<Form action="/auth/logout" method="post">
										<button type="submit" className="btn">
											Logout {user.username}
										</button>
									</Form>
								</li>
							</>
						) : null}
					</ul>
				</div>
			</nav>
			<div className="container">{children}</div>
		</>
	)
}