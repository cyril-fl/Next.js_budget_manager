import type { NextConfig } from "next";
import { config }  from './.core';

const nextConfig: NextConfig = {
	env: {
		next_env: process.env.NEXT_ENV || 'development',
		api_url: config.api.url,
	},
};

export default nextConfig;
