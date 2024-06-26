const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			title: 'Webpack Plugin',
			favicon: './favicon.ico',
		}),
		new WebpackPwaManifest({
			name: 'Text Editor',
			short_name: 'JATE',
			description: 'A PWA text editor',
			background_color: '#7eb4e2',
			theme_color: '#7eb4e2',
			start_url: './',
			publicPath: '/',
			icons: [
			  {
				src: path.resolve('./src/images/logo.png'),
				sizes: [96, 128, 192, 256, 384, 512],
				destination: path.join('assets', 'icons'),
			  },
			],
			filenameHashing: false,
		}),
    	new InjectManifest({
			swSrc: './src-sw.js',
			swDest: 'service-worker.js',
		}),
    ],

    module: {
      rules: [
		{
        test: /\.css$/,
		use: ['style-loader', 'css-loader'],
		},
		{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		  loader: 'babel-loader',
		},
	  },
      ],
    },
  };
};
