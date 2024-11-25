const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    // Other rules...
    plugins: [
        new NodePolyfillPlugin()
    ]
}

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    // Your existing configuration
    plugins: [
        // Other plugins
        new NodePolyfillPlugin()
    ],
    resolve: {
        fallback: {
            fs: false, // Example fallback
            // Add any other fallbacks if required
        },
    },
};