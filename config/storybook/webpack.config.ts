import path from 'path';

import webpack from 'webpack';

import { cssLoader } from '../build/loaders/cssLoader';
import { BuildPaths } from '../build/types/config.types';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    buildLocales: '',
    locales: '',
  };
  config!.resolve!.modules!.push(paths.src);
  config!.resolve!.alias = { '@': paths.src };
  config!.resolve!.extensions!.push('.ts', '.tsx');

  // eslint-disable-next-line no-param-reassign
  config!.module!.rules = config!.module!.rules!.map((rule: any) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config!.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config!.module!.rules.push(cssLoader(true));
  config.plugins?.push(new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __SERVER_URL__: JSON.stringify('https://test.ru'),
    __PROJECT__: JSON.stringify('storybook'),
  }));

  return config;
};
