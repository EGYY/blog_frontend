import webpack from 'webpack';
import { BuildOptions } from './types/config.types';
import { cssLoader } from './loaders/cssLoader';
import { babelLoader } from './loaders/babelLoader';

export function loaders(options: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // };

  const styleLoader = cssLoader(options.isDev);
  const codeBabelLoader = babelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = babelLoader({ ...options, isTsx: true });

  return [
    codeBabelLoader,
    tsxCodeBabelLoader,
    // tsLoader,
    styleLoader,
    fileLoader,
    svgLoader,
  ];
}
