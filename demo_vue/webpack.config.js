const WebpackTemplate = require('nativescript-akylas-webpack-template');
const { resolve } = require('path');
const webpack = require('webpack');
module.exports = env => {
    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    const {
        development = false,
    } = env;
    let aliases = {
        vue: 'nativescript-vue'
    }
    const projectRoot = __dirname;
    if (development) {
        aliases['nativescript-chart'] = resolve(projectRoot, '..', 'src', 'charting');

    }
    
    console.log('running webpack with env', env);
    const config = WebpackTemplate(env, {
        projectRoot,
        targetArchs:['arm'],
        alias:aliases,
        chunkTestCallback:function(moduleName) {return /canvas/.test(moduleName)}
    });
    if (development) {
        config.plugins.push(
            new webpack.ContextReplacementPlugin(/nativescript-chart/, resolve(projectRoot, '..', 'src', 'charting'))
        );
    }
    return config;
};
