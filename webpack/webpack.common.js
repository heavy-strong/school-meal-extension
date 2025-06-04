const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist/scripts');

// cp -r src/styles dist/styles && cp -r public/icons dist/icons && cp -r src/pages dist/pages && cp public/index.html dist/index.html && cp src/manifest.json dist/manifest.json

module.exports = {
  entry: {
    background: path.join(srcPath, 'scripts/background.ts'),
    script: path.join(srcPath, 'scripts/script.ts'),

    // background: [path.resolve(srcPath, 'scripts/background.ts')],
    // script: [path.resolve(srcPath, 'scripts/script.ts')],
    // popup: path.join(srcDir, 'popup.tsx'),
    // options: path.join(srcDir, 'options.tsx'),
    // content_script: path.join(srcDir, 'content_script.tsx'),
  },
  output: {
    path: distPath,
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'script',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@': srcPath,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
      options: {},
    }),
  ],
};