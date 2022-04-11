import { Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { marked } from 'marked'
import type { PostItem } from '~/routes/posts/index'

// get posts/${postsId}
export const loader: LoaderFunction = async ({ params }) => {
  const { postId } = params
  const url = process.env.STRAPI_URL + `/api/posts/${postId}`
  const res = await fetch(url)
  const jsonData = await res.json()
  let { data, meta } = jsonData
  const { attributes } = data
  let { body } = attributes

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

  marked.use({ renderer })
  // change body from markdown to html
  data['attributes']['body'] = marked(body)
  return {
    data,
    meta,
  }
}

export interface ILoaderDataPost {
  data: PostItem,
  meta: any,
}

const Post = () => {
  const { data } = useLoaderData<ILoaderDataPost>()

  return (
    <div>
      <div className='page-header'>
        <h1>{data.attributes.title}</h1>
        <Link to='/posts' className='btn btn-reverse'>
          Back
        </Link>
      </div>
      <div>
        {data.attributes.description} --- published at {new Date(data.attributes.publishedAt).toLocaleDateString()}
      </div>
      <div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.attributes.body }} />
    </div>
  )
}

export default Post