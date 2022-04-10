import { useParams } from '@remix-run/react'

const Post = () => {
  const { postId } = useParams()

  return (
    <div>
      <h1>Post {postId}</h1>
    </div>
  )
}

export default Post