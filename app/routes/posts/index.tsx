import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'

export interface PostItem {
  id: string,
  attributes: {
    title: string,
    body: string,
    description: string,
    publishedAt: string,
  }
}

export interface ILoaderDataPosts {
  data: PostItem[],
  meta: any,
}

export const loader:LoaderFunction = async () => {
  // get posts
  const url = process.env.STRAPI_URL + '/api/posts'
  const res = await fetch(url)
  const jsonData = await res.json()
  const { data, meta } = jsonData
  return {
    data,
    meta,
  }
}

const PostItems = () => {
  const { data } = useLoaderData<ILoaderDataPosts>()

  return (
    <>
      <div className='page-header'>
        <h1>Posts</h1>
        <Link to='/posts/new' className='btn'>
          New Post
        </Link>
      </div>
      <ul className='posts-list'>
        {data.map((post: PostItem) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h3>{post.attributes.title}</h3>
              <p>{post.attributes.description}</p>
              {new Date(post.attributes.publishedAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostItems