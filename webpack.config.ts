import path from "path";
import webpack from "webpack";
import { webpackConfig } from "./config/build/webpackConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config.types";


export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    const mode = env.mode || 'development'
    const isDev = mode === 'development';
    const port = env.port || 3000;

    const config: webpack.Configuration = webpackConfig({
        mode,
        paths,
        isDev,
        port,
    });
    return config
};