'use client'; // wajib supaya bisa pakai useRouter

import { useRouter } from 'next/router';
import Link from 'next/link';
import posts from '../lib/postsMetadata';

export default function TagPosts() {
  const router = useRouter();
  const { tag } = router.query;

  if (!tag) return <p>Loading...</p>;

  const filteredPosts = posts.filter(post =>
    post.tags?.map(t => t.toLowerCase()).includes(String(tag).toLowerCase())
  );

  return (
    <>
      <h1>Posts tagged with &quot;{tag}&quot;</h1>
      {filteredPosts.length === 0 ? (
        <p>No posts found with tag &quot;{tag}&quot;.</p>
      ) : (
        <ul>
          {filteredPosts.map(post => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
