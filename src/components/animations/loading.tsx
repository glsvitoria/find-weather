import Lottie from 'lottie-react'
import animationData from '../../assets/loading.json'

export function Loading() {
	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<Lottie
				animationData={animationData}
				className="flex justify-center items-center w-1/2 h-1/2"
				loop={true}
			/>
		</div>
	)
}
