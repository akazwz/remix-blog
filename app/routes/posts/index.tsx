import {Link, useLoaderData} from '@remix-run/react'
import type {LoaderFunction} from '@remix-run/node'
import type {PostItem} from "~/types";
import {db} from '~/utils/db.server'

export const loader: LoaderFunction = async () => {
    return {
        posts: await db.post.findMany({
            take: 20,
            select: {id: true, title: true, body: true, createdAt: true},
            orderBy: {createdAt: 'desc'}
        })
    }
}

export type LoaderDataPosts = {
    posts: Array<PostItem>
}

const PostItems = () => {
    const {posts} = useLoaderData<LoaderDataPosts>()
    return (
        <>
            <div className='page-header'>
                <h1>Posts</h1>
            </div>
            <ul className='posts-list'>
                {posts.map((post: PostItem) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <h3>{post.title}</h3>
                            {new Date(post.createdAt!).toLocaleString()}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PostItems