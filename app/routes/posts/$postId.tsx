import { Form, Link, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { marked } from 'marked'
import { db } from '~/utils/db.server'
import type { PostItem } from '~/types'
import { getUser } from '~/utils/session.server'
import { redirect } from '@remix-run/node'

// get post by postId
export const loader:LoaderFunction = async ({ request, params }) => {
	const { postId } = params

	const post = await db.post.findUnique({
		where: { id: postId }
	})

	if (!post) throw new Error('Post not found')

	const user = await getUser(request)

	const data = { post, user }
	const body = post.body

	// let image show more responsive(refer to dev.to)
	const renderer:any = {
		image (href:string | null, title:string | null):string {
			return `<img
                src=${href} 
                alt=${title} 
                loading='lazy'
                style='
                    height: auto;
                    object-fit: contain;
                    display: block;
                    margin: 1.24rem auto;
                    max-width: 100%; 
                    max-height: calc(50vh + 180px);
                    border-radius: 0.375rem;
                  '
               />`
		}
	}

	marked.use({ renderer })
	// change body from markdown to html
	data['post']['body'] = marked(body)

	return data
}

export const action:ActionFunction = async ({ request, params }) => {
	if (request.method !== 'DELETE') return {}

	const { postId } = params

	const user = await getUser(request)

	const post = await db.post.findUnique({
		where: { id: postId }
	})

	if (!post) throw new Error('Post not found')

	if (user && post.userId === user.id) {
		await db.post.delete({ where: { id: postId } })
	}

	return redirect('/posts')
}

type LoaderDataPost = {
	post:PostItem
	user:any
}

const Post = () => {
	const data = useLoaderData<LoaderDataPost>()
	const { post, user } = data

	return (
		<div>
			<div className="page-header">
				<h1>{post.title}</h1>
				<Link to="/posts" className="btn btn-reverse">
					Back
				</Link>
			</div>
			{/* post date */}
			<div>
				--- {new Date(post.createdAt!).toLocaleString()}
			</div>

			{/* markdown render to html*/}
			<div dangerouslySetInnerHTML={{ __html: post.body }}/>

			<div className="page-footer">
				{/* user owned the post can delete */}
				{user?.id === post?.userId && (
					<Form method="delete">
						<input type="hidden" name="_method" value="delete"/>
						<button className="btn btn-delete">Delete</button>
					</Form>
				)}
			</div>
		</div>
	)
}

export default Post