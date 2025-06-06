import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config.types';

export function devConfig(options: BuildOptions): DevServerConfiguration {
  const { port } = options;
  return {
    port,
    open: true,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: false,
    },
  };
}
