module.exports = {
    entry: './src/entry.js',
    output: {
        filename: './target/entry.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                    ],
                    plugins: [
                        'babel-plugin-transform-object-rest-spread',
                    ],
                }
            }
        ],
    },
}
