import { type CollectionEntry } from 'astro:content'

type Post = CollectionEntry<'blog'>

export function filterPostsByCategory (category: string, posts: Post[]) {
	return posts.filter((post) => post.data.categories.includes(category))
}
