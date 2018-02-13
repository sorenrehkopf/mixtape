const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const buildDir = path.resolve(__dirname, 'public');
const appDir = path.resolve(__dirname, 'src');

const config = {
	entry: appDir+'/index.jsx',
	output: {
		path:buildDir,
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.jsx?/,
				include:appDir,
				loader:'babel-loader'
			},
			{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
        	use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
	      }),
		  },
		  {
	      test: /\.scss$/,
	      exclude: /node_modules/,
	      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
	      }),
		  }
		]
	},
	plugins: [
		new ExtractTextPlugin("style.css")
	],
	devServer: {
		contentBase: buildDir,
		inline: true,
		port:3030,
		proxy: {
			"/api": "http://localhost:3000/api",
			"*": "http://localhost:3000"
		}
	}
};

module.exports = config;