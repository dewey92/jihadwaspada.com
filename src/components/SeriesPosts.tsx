import type { CollectionEntry } from 'astro:content'
import { useMemo, useEffect, useReducer } from 'preact/hooks'

import style from './SeriesPosts.module.scss'

interface Props {
	currentTitle: string
	series: string
	posts: CollectionEntry<'blog'>[]
}

export default function SeriesPosts ({ currentTitle, series, posts: ps }: Props) {
	const [open, handleToggle] = useReducer<boolean, void>((s) => !s, false)

	const posts = useMemo(() => ps.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()), [])
	const currentIndex = posts.findIndex((p) => p.data.title === currentTitle)
	const total = posts.length

	useEffect(() => {
		let tid: number
		if (open) {
			tid = window.setTimeout(() => {
				document.querySelector(`.${style.currentlyReading}`)?.scrollIntoView({
					block: 'nearest',
				})
			}, 20)
		}

		return () => clearTimeout(tid)
	}, [open])

	return (
		<aside className={style.seriesPostsRoot}>
			<header
				onClick={() => handleToggle()}
				aria-expanded={open ? 'true' : 'false'}
				aria-controls="series-posts__list"
			>
				<h4>Series: {series}&nbsp;&nbsp;•&nbsp;&nbsp;<small>{currentIndex + 1}/{total}</small></h4>
				<i className={`fa-solid fa-chevron-${open ? 'down' : 'up'}`}></i>
			</header>

			<div className={style.list} role="list" id="series-posts__list">
				{posts.map((p) => (
					<a
						href={`/blog/${p.slug}`}
						className={[style.listItem, currentTitle === p.data.title ? style.currentlyReading : ''].join(' ')}
						role="listitem"
					>
						<img src={p.data.image?.src ?? '#'} alt="" className={style.articleImage} />
						<h5 className={style.articleTitle}>{p.data.title}</h5>
					</a>
				))}
			</div>
		</aside>
	)
}
