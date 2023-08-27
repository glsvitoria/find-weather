import { CloudRain, Sun, Cloud } from '@phosphor-icons/react'

interface IRenderIconByWeather {
	weather: 'Rain' | 'Clouds' | 'Clear' | string
}

export function renderIconByWeather({ weather }: IRenderIconByWeather) {
	switch (weather) {
		case 'Rain':
			return <CloudRain size={32} />
		case 'Clouds':
			return <Cloud size={32} />
		case 'Clear':
			return <Sun size={32} />
		default:
			return null
	}
}
