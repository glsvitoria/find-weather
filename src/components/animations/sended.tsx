import Lottie from 'lottie-react'
import animationData from '../../assets/sended.json'

export function Sended() {
	return (
		<div className="flex flex-col w-full justify-center items-center">
			<Lottie
				animationData={animationData}
				className="flex justify-center items-center xl:w-64 md:w-48 sm:w-32 w-28 xl:h-64 md:h-48 sm:h-32 h-28"
				loop={true}
			/>
		</div>
	)
}
