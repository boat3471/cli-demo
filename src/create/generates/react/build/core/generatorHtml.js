const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = require('../.entry');

const chunkNames = Object.keys(entries);

const htmlList = [];
for (const chunkName of chunkNames) {
    // 忽略common chunk
    if (chunkName === 'common') {
        continue;
    }

    htmlList.push(new HtmlWebpackPlugin({
        // host: config.HOST,
        title: ' ',
        meta: {},
        inject: true,
        chunkName: chunkName,
        template: path.join(__dirname, 'template/index.ejs'),
        filename: '../html/' + chunkName + '.html',
        chunks: ['manifest', 'common', chunkName],
        minify: {
            collapseWhitespace: true,
            preserveLineBreaks: true
        }
    }));
}

module.exports = htmlList;


