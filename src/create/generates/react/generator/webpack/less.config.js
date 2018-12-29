module.exports =
    `
            {
                test: /\\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {url: false, sourceMap: true}},
                    {loader: 'less-loader', options: {sourceMap: true}}
                ],
                exclude: /node_modules/
            }, `;
