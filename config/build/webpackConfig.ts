import webpack from 'webpack';
import { devConfig } from "./devConfig";
import { loaders } from "./loaders";
import { plugins } from "./plugins";
import { resolvers } from "./resolvers";
import { BuildOptions } from "./types/config.types";

export function webpackConfig(options: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = options;
    return {
        mode,
        entry: paths.entry,
        module: {
            rules: loaders(options),
        },
        resolve: resolvers(),
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: plugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? devConfig(options) : undefined,
    }
}