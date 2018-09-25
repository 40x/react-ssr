// Plugin into node's require function
require('@babel/register')({
    presets: ['@babel/env', '@babel/react']
});

// provide polyfills to compile
require('@babel/polyfill');

// ignore styles
require('ignore-styles');

// start server
require('./server');