/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*/',
                destination: 'http://localhost:8090/:path*/',
            },
        ]
    },
}

module.exports = nextConfig
