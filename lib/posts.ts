// lib/posts.ts

import fs from 'fs';
import path from 'path';

export function getAllPosts() {
  const postsDir = path.join(process.cwd(), 'pages/posts');
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');

  return files.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
    title: filename.replace(/\.mdx$/, ''), // bisa ambil frontmatter nanti
  }));
}
