/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "replicate.com",
            "replicate.delivery",
            "rolasotelo-portfolio.s3.amazonaws.com"
        ],
    }
}

module.exports = nextConfig
