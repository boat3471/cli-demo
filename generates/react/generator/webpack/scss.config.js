module.exports =
    `
            {
                test: /\\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {url: false, sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                ],
                exclude: /node_modules/
            }, `;
