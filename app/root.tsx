import {
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload,
  Link,
} from '@remix-run/react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import type { ErrorBoundaryComponent } from '@remix-run/node'
import type { ReactNode } from 'react'
import globalStylesUrl from './styles/gloabal.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: globalStylesUrl }]

export const meta: MetaFunction = () => {
  const description = 'A cool blog built with Remix'
  const keywords = 'remix, react, javascript, typescript,'

  return {
    description,
    keywords,
  }
}

// error boundary
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  )
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

interface IDocument {
  children: ReactNode,
  title?: string,
}

function Document({ children, title }: IDocument) {
  return (
    <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      {typeof document === 'undefined' ? '__STYLES__' : null}
      <Meta />
      <Links />
      <title>{title ?? 'Remix Blog'}</title>
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

interface ILayout {
  children: ReactNode,
}

function Layout({ children }: ILayout) {
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='logo'>
          <img src={'/logo.png'} alt='logo' width='32px' height='32px' />
          AKAZWZ
        </Link>
        <ul className='nav'>
          <li>
            <Link to='posts'>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
      <div className='container'>{children}</div>
    </>
  )
}