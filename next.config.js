/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		OPEN_WEATHER_KEY: '00ca6488212176303dda00f246a78c46',
		GEOAPIFY_KEY: '1ccf08422edd4f68ac1f07a55cf2aa9a',
		NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
	},
}

module.exports = nextConfig
