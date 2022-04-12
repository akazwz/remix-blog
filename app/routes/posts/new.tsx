import {useState} from "react"
import {Form, Link, useActionData} from '@remix-run/react'
import {json, redirect} from '@remix-run/node'

import type {ActionFunction} from '@remix-run/node'
import type {ChangeEvent} from "react";
import type {PostItem} from "~/types";

import {db} from '~/utils/db.server'
import Editor from "~/editor";

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
    return json(data, {status: 400})
}

export const action: ActionFunction = async ({request}) => {
    const form = await request.formData()
    const title = form.get('title')
    const body = form.get('body')

    const fieldErrors = {
        title: validateTitle(title),
        body: validateBody(body),
    }

    let fields = {title, body}

    if (typeof title != 'string' || typeof body !== 'string') {
        return badRequest({fieldErrors, fields})
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({fieldErrors, fields})
    }

    const postItem: PostItem = {title, body}

    const post = await db.post.create({data: postItem})

    return redirect(`/posts/${post.id}`)
}

export interface IPostItemAction {
    title?: string
    body?: string
}

export interface IActionData {
    fieldErrors: IPostItemAction
    fields: IPostItemAction
}

const NewPost = () => {
    const actionData = useActionData<IActionData>()
    const [bodyValue, setBodyValue] = useState<string>('')
    const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.currentTarget.value
        setBodyValue(val)
    }

    console.log(bodyValue)

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
                            defaultValue={actionData?.fields.title}
                        />
                        <div className='error'>
                            {actionData?.fieldErrors.title
                                ? (
                                    <p
                                        className='form-validation-error'
                                        role='alert'
                                        id='title-error'
                                    >
                                        {actionData.fieldErrors.title}
                                    </p>
                                )
                                : null
                            }
                        </div>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='body'>Body</label>
                        {/*<textarea
                            name='body'
                            id='body'
                            defaultValue={actionData?.fields.body}
                        />*/}
                        <Editor value={bodyValue} handleValueChange={handleEditorChange}/>
                        <div className='error'>
                            {actionData?.fieldErrors.body
                                ? (
                                    <p
                                        className='form-validation-error'
                                        role='alert'
                                        id='body-error'
                                    >
                                        {actionData.fieldErrors.body}
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

