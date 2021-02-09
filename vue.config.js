const Assembly = require('@mapbox/assembly');

module.exports = {
    publicPath: './docs',
    chainWebpack: () => {
        Assembly.buildUserAssets('public/')
    }
};
