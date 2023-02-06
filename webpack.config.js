const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				memoryLimit: 8192,
			},
		}),
	],
};
