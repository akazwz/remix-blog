import { Form, Link, useActionData } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'

const validateTitle = (title: any) => {
  if (typeof title !== 'string' || title.length < 3) {
    return 'Title must be at least 3 characters'
  }
}

const validateBody = (body: any) => {
  if (typeof body !== 'string' || body.length < 3) {
    return 'Body must be at least 3 characters'
  }
}

const badRequest = (data: any) => {
  return json(data, { status: 400 })
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const body = form.get('body')

  const fields = { title, body }

  const fieldErrors = {
    title: validateTitle(title),
    body: validateBody(body),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest(fieldErrors)
  }

  return {}
}

export interface IActionData {
  title?: string,
  body?: string
}

const NewPost = () => {
  const actionData = useActionData<IActionData>()

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
          <div className='form-control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
            />
            <div className='error'>
              {actionData?.title
                ? (
                  <p
                    className='form-validation-error'
                    role='alert'
                    id='title-error'
                  >
                    {actionData.title}
                  </p>
                )
                : null
              }
            </div>
          </div>
          <div className='form-control'>
            <label htmlFor='body'>Body</label>
            <textarea
              name='body'
              id='body'
            />
            <div className='error'>
              {actionData?.body
                ? (
                  <p
                    className='form-validation-error'
                    role='alert'
                    id='body-error'
                  >
                    {actionData.body}
                  </p>
                )
                : null
              }
            </div>
          </div>
          <button type='submit' className='btn btn-block'>
            Add Post
          </button>
        </Form>
      </div>
    </>
  )
}

export default NewPost

