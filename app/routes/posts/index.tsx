import { Link, useLoaderData } from '@remix-run/react'

export interface PostItem {
  id: string,
  title: string,
  body: string,
}

export interface Data {
  posts: PostItem[]
}

export const loader = async () => {
  const posts: PostItem[] = [
    { id: '001', title: 'Post 1', body: 'This is test post' },
    { id: '002', title: 'Post 2', body: 'This is test post' },
    { id: '003', title: 'Post 3', body: 'This is test post' },
  ]
  return {
    posts,
  }
}


const PostItems = () => {
  const { posts } = useLoaderData<Data>()

  return (
    <div>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts.map((post:PostItem)=>(
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostItems