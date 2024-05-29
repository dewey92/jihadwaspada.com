import { type CollectionEntry } from 'astro:content'

type Post = CollectionEntry<'blog'>

export async function getMinutesRead (posts: Post[]) {
	const postsWithMinutesRead = await Promise.all(
		posts.map(async (post) => {
			const { remarkPluginFrontmatter: { minutesRead } } = await post.render()

			return {
				...post,
				data: { ...post.data, minutesRead: minutesRead as string }
			}
		})
	)

	return postsWithMinutesRead
}

export function filterPostsByCategory (category: string, posts: Post[]) {
	return posts.filter((post) => post.data.categories.includes(category))
}
