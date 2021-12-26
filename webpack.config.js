const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const dartSass = require('dart-sass');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];

        return new htmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        })
    })
}

const html = generateHtmlPlugins('./src/include');

module.exports = {
    target: 'web',
    entry: {
        index: path.resolve(__dirname, './src/js', 'main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [].concat(html),
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: dartSass
                        }
                    }
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node-modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}