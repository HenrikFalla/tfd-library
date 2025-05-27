import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'open.api.nexon.com',
				port: '',
			},
		],
	},
	/* config options here */
};

export default nextConfig;

