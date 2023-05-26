import Link from 'next/link'
import { createReader, type Entry } from '@keystatic/core/reader'
import keystaticConfig from '@/app/keystatic/keystatic.config'
import Image from 'next/image'

const reader = createReader('', keystaticConfig)

export default async function Page() {
  type AllPosts = {
    slug: string
    entry: Entry<(typeof keystaticConfig)['collections']['posts']>
  }[]

  // Get data from file system with Keystatic's Reader API
  const allPosts: AllPosts = await reader.collections.posts.all()

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/keystatic" className="underline hover:no-underline">
        Keystatic Admin UI &rarr;
      </Link>
      <div className="mt-8">
        <h1 className="text-xl font-semibold">Posts from Keystatic</h1>

        <ul className="mt-4 grid gap-12 max-w-lg">
          {allPosts.map(({ slug, entry: post }) => (
            <li key={slug}>
              {post.image && (
                <Image
                  className="object-cover aspect-video w-64 rounded mb-4"
                  src={post.image}
                  width={640}
                  height={480}
                  alt=""
                />
              )}
              <h2 className="text-lg font-medium">{post.title}</h2>
              <p className="mt-2">{post.description}</p>
              <div className="flex items-center gap-2">
                {post.date && (
                  <p className="mt-2 text-sm text-gray-700">
                    Posted on {new Date(post.date).toLocaleDateString()}{' '}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* You can uncomment the `pre` tag below to see a dump of the allPosts data  */}

        {/* <pre className="mt-4">{JSON.stringify(allPosts, null, 2)}</pre> */}
      </div>
    </div>
  )
}
