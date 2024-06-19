import type { JSXInternal } from 'node_modules/preact/src/jsx'
import style from './EmDemo.module.scss'
import { useReducer, useState } from 'preact/hooks'

interface FontProps {
	mode: 'textUnderline' | 'letterSpacing' | 'verticalMargin'
	codeEm: JSXInternal.Element
	codePx: JSXInternal.Element
}

export function EmTextFontDemo ({ mode, codeEm, codePx }: FontProps) {
	const [fs, setFs] = useReducer(
		(state: number, input: number) => input < 8 || input > 40 ? state : input,
	20
	)
	const [unit, setUnit] = useState('em')
	const onReset = () => {
		setFs(20)
		setUnit('em')
	}

	const resultClassList = [
		unit === 'px' ? style.px : undefined,
		style[mode],
	].filter(Boolean).join(' ')

	return (
		<div class={style.container}>
			<div>
				{unit === 'em' ? codeEm : codePx}
			</div>
			<div>
				<form>
					<fieldset>
						<legend>Controls</legend>
						<div class={style.control} style={{ display: 'flex', gap: 8 }}>
							Unit:
							<label>
								<input
									type="radio"
									name={`${mode}-unit`}
									value="em"
									onInput={() => setUnit('em')}
									defaultChecked={unit === 'em'}
								/> em
							</label>
							<label>
								<input
									type="radio"
									name={`${mode}-unit`}
									value="px"
									onInput={() => setUnit('px')}
									defaultChecked={unit === 'px'}
								/> px
							</label>
						</div>
						<label class={style.control}>
							Font size:
							<input
								type="range"
								min="8"
								max="40"
								onInput={(e) => setFs(parseInt(e.currentTarget.value, 10))}
								defaultValue={fs.toString()}
							/>
							{fs}px
						</label>

						<button type="reset" onClick={onReset}>Reset</button>
					</fieldset>
				</form>

				<span style={{ fontSize: fs }} class={resultClassList}>
					{mode === 'textUnderline' && 'Underline result'}
					{mode === 'letterSpacing' && 'Letter spacing result'}
					{mode === 'verticalMargin' && (
						<>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
						</>
					)}
				</span>
			</div>
		</div>
	)
}

interface SpacingProps {
	code: JSXInternal.Element
}

export function EmSpacingDemo ({ code }: SpacingProps) {
	const fs = {
		sm: 12,
		md: 16,
		lg: 20,
	}

	return (
		<div class={style.container} style={{ height: 'auto' }}>
			<div>{code}</div>
			<div>
				{Object.values(fs).map((val) => (
					<div class={style.callout} style={{ fontSize: val }}>
						⚠ <code>font-size: {val}px</code>&nbsp;
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua.
					</div>
				))}
			</div>
		</div>
	)
}

interface CascadingProps {
	code: JSXInternal.Element
}

export function EmCascadingDemo ({ code }: CascadingProps) {
	return (
		<div class={style.container} style={{ height: 'auto' }}>
			<div>{code}</div>
			<div>
				<ul class={style.cascading}>
					<li>#1</li>
					<li>#2</li>
					<li>#3</li>
					<li>
						<ul>
							<li>Nested ##1</li>
							<li>Nested ##2</li>
							<li>Nested ##3</li>
							<li>
								<ul>
									<li>Nested ###1</li>
									<li>Nested ###2</li>
									<li>Nested ###3</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	)
}
