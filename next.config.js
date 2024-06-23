// eslint-disable-next-line
const withTM = require('next-transpile-modules')(['@proton/web-sdk']);
// const withStyledComponents = require('next-plugin-styled-components');
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["nextui-docs-v2.vercel.app"],
    },
};
module.exports = withTM(
    ({
        images: {
            domains: [
                'cloudflare-ipfs.com',
                'gateway.pinata.cloud',
                'ipfs.io',
                'bloks.io',
                ...nextConfig.images.domains,
            ],
        },

        webpack: (
            config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
        ) => {
            if (config.cache && !dev) {
                config.cache = Object.freeze({
                    type: 'memory',
                })
                config.cache.maxMemoryGenerations = 0
            }
            // Important: return the modified config
            return config
        },



        publicRuntimeConfig: {
            firebase: {
                apiKey: 'AIzaSyDmqEpBSu_APMnGpLvG43nrbWHKFXgR7FE',
                authDomain: 'proton-market.firebaseapp.com',
                projectId: 'proton-market',
            },
            protonBackendServiceApi: process.env.BACKEND_ENDPOINT,
        },
        ...nextConfig,
    }),
);