'use client'

import Link from 'next/link'
import { useState } from 'react'

const POSTS_PER_PAGE = 5

type Post = {
  slug: string
  title: string
  description: string
  date: string
}

export default function PostList({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(1)

  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  return (
    <div className="max-w-3xl mx-auto px-4">
      {paginatedPosts.map(post => (
        <div key={post.slug} className="mb-10">
          <h3 className="text-2xl font-semibold text-blue-700 hover:underline">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-sm text-gray-500 mt-1">{formatDate(post.date)}</p>
          <p className="text-gray-700 mt-2">{post.description}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-12 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1
          const isActive = page === pageNumber

          return (
            <button
              key={i}
              onClick={() => setPage(pageNumber)}
              className={`px-4 py-2 text-sm rounded-md ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } transition`}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', options)
}
