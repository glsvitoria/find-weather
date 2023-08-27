import { ButtonHTMLAttributes, ReactNode } from 'react'
import Lottie from 'lottie-react'

import loadingAnimation from '../assets/loading.json'
import { overrideTailwindClasses } from 'tailwind-override'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	isLoading?: boolean
}

export default function Button({
	children,
	className = '',
	isLoading = false,
	...rest
}: IButtonProps) {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loadingAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	return (
		<button
			className={`flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm leading-[14px] bg-zinc-600 text-400 hover:brightness-50 duration-300 ${overrideTailwindClasses(
				className
			)}`}
			type="button"
			{...rest}
		>
			{isLoading && (
				<Lottie
					options={defaultOptions}
					height={64}
					width={40}
					isClickToPauseDisabled
					style={{
						cursor: 'auto',
					}}
				/>
			)}

			{children}
		</button>
	)
}
