import { Link, useLoaderData } from '@remix-run/react'

export interface PostItem {
  id: string,
  attributes: {
    title: string,
    body: string,
  }
}

export interface ILoaderData {
  data: PostItem[],
  meta: any,
}

export const loader = async () => {
  const url = process.env.STRAPI_URL + '/api/posts'
  const res = await fetch(url)
  const jsonData = await res.json()
  const {data, meta} = jsonData
  return {
    data,
    meta,
  }
}

const PostItems = () => {
  const { data, meta } = useLoaderData<ILoaderData>()

  return (
    <div>
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostItems