import { Form, Link } from '@remix-run/react'

const NewPost = () => {
  return (
    <>
      <div className='page-header'>
        <h1>New Post</h1>
        <Link to='/posts' className='btn btn-reverse'>
          Back
        </Link>
      </div>

      <div className='page-content'>
        <Form method='post'>

        </Form>
      </div>
    </>
  )
}

export default NewPost

