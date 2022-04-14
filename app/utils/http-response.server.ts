import { json } from '@remix-run/node'

export const badRequest = (data:any) => {
	return json(data, { status: 400 })
}