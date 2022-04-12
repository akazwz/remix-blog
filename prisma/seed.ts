import {PrismaClient} from "@prisma/client"
import type {PostItem} from "~/types"

const db = new PrismaClient()

const getPosts = (): Array<PostItem> => {
    return [
        {
            id: '001',
            title: 'Remix vs Next.js',
            body: 'Remix improves the developer experience with new abstractions and the user experience by distributing less JavaScript. But Next. js has a more extensive user base with more significant resources allocated to its development from the Vercel team',
        },
        {
            id: '002',
            title: 'Use Remix build blog',
            body: 'In this tutorial, you will learn how to build a blog app with remix',
        },
        {
            id: '003',
            title: 'Prisma Crash',
            body: 'Prisma helps app developers build faster and make fewer errors with an open source database toolkit for PostgreSQL, MySQL, SQL Server, SQLite, MongoDB and CockroachDB (Preview).',
        },
        {
            id: '004',
            title: 'Typescript Crash',
            body: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
        },
    ]
}

const seed = async () => {
    await Promise.all(
        getPosts().map((post) => {
            return db.post.create({data: post})
        })
    )
}

seed()
    .then(()=>console.log('seed success'))
    .catch((e:any)=>console.log('seed error' + e.message))

