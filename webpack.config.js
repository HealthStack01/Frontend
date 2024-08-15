const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // other configurations
  plugins: [
    new ESLintPlugin({
      failOnError: false,
      emitWarning: true,
      // Remove deprecated options
      // extensions: ['js', 'jsx', 'ts', 'tsx'],  // REMOVE this line
      // resolvePluginsRelativeTo: __dirname,     // REMOVE this line
      context: 'src',
      emitWarning: true,
    }),
  ],
};
