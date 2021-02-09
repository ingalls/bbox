const Assembly = require('@mapbox/assembly');

module.exports = {
    publicPath: '/bbox/',
    chainWebpack: () => {
        Assembly.buildUserAssets('public/')
    }
};
