import {Link, useLoaderData} from '@remix-run/react'
import type {LoaderFunction} from '@remix-run/node'
import {marked} from 'marked'
import {db} from '~/utils/db.server'
import type {PostItem} from "~/types";

// get posts/${postsId}
export const loader: LoaderFunction = async ({params}) => {
    const {postId} = params

    const post = await db.post.findUnique({
        where: {id: postId}
    })

    if (!post) throw new Error('Post not found')

    const data = {post}
    const body = post.body

    // let image show more responsive(refer to dev.to)
    const renderer: any = {
        image(href: string | null, title: string | null): string {
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

    marked.use({renderer})
    // change body from markdown to html
    data['post']['body'] = marked(body)
    console.log(data)
    return data
}

type LoaderDataPost = {
    post: PostItem
}

const Post = () => {
    const data = useLoaderData<LoaderDataPost>()
    const {post} = data

    return (
        <div>
            <div className='page-header'>
                <h1>{post.title}</h1>
                <Link to='/posts' className='btn btn-reverse'>
                    Back
                </Link>
            </div>
            <div>
                --- published at {new Date(post.createdAt!).toLocaleString()}
            </div>
            <div>
            </div>
            <div dangerouslySetInnerHTML={{__html: post.body}}/>
        </div>
    )
}

export default Post