const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '2.sea-core-crash.js',
    library: 'scc',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: false
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};