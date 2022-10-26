const {
    override,
    addDecoratorsLegacy,
    addLessLoader, addWebpackModuleRule
} = require('customize-cra')

module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
    addWebpackModuleRule({
        test: [/\.css$/, /\.less$/],
        use: ['style-loader', 'css-loader', 'postcss-loader', { loader: 'less-loader' }]
    }),
)
