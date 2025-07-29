import path from 'path';

import webpack from 'webpack';

import { BuildEnv, BuildPaths } from './config/build/types/config.types';
import { webpackConfig } from './config/build/webpackConfig';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  };

  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const port = env.port || 3000;
  const analyze = env.analyze || false;
  const serverUrl = env.sereverUrl || 'http://localhost:5000';

  const config: webpack.Configuration = webpackConfig({
    mode,
    paths,
    isDev,
    port,
    analyze,
    serverUrl,
  });
  return config;
};
