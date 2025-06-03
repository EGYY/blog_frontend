import { BuildOptions } from "./types/config.types";
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export function devConfig(options: BuildOptions): DevServerConfiguration {
    const { port } = options;
    return {
        port,
        open: true,
        historyApiFallback: true,
        hot: true,
    }
}