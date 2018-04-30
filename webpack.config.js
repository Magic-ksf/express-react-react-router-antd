const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin')


let webpackConfig = {
	devtool: 'cheap-module-eval-source-map',
	entry:{
		index:'./src/index.js'
	},
	devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8086,
        hot:true,
        compress: true,
        watchContentBase: false,
        stats: {
            chunkModules: false,
            modules: false,
            error: true,
            errorDetails: true,
            publicPath: true
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                  '^/api': '/api'
                },
                changeOrigin: true
            },
        }
    },
	output:{
		path:path.resolve(__dirname,'./dist'),
		publicPath:'dist/',
		filename: '[name].js'
	},
	resolve:{
		extensions: ['.js', '.jsx'],
		alias:{
			'page':path.resolve(__dirname,'./src/page')
		}
	},
	module:{
		rules:[{
			test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options:{
            	presets: ['react', 'stage-0']
            }
		},{
			test:/\.css|less$/,
			use:[
                {
		            loader: 'style-loader'
		        },
		        {
		            loader: 'css-loader'
		        },
		        {
		            loader: 'postcss-loader'
		        },{
		        	loader:'less-loader',
		        	options: { javascriptEnabled: true }
		        }
			]
		},{
            test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/i,
            loader: 'url-loader?name=[hash:8].[ext]&limit=10000',			
		}]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]
}
if (process.env.NODE_ENV === 'production') {
	module.exports.devtool           = false;
	module.exports.output.publicPath = '/dist';

	module.exports.plugins           = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	])
}


module.exports = webpackConfig;