import {
  Meta,
  Links,
  Outlet,
  LiveReload,
  Link,
} from '@remix-run/react'
import type { ReactNode } from 'react'
import globalStylesUrl from './styles/gloabal.css'

export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }]

export const meta = () => {
  const description = 'A cool blog built with Remix'
  const keywords = 'remix, react, javascript, typescript,'

  return {
    description,
    keywords,
  }
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
      <Meta />
      <Links />
      <title>{title ?? 'Remix Blog'}</title>
    </head>
    <body>
    {children}
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
          <img src={'/logo.png'} alt='logo' width="32px" height="32px"/>
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