import path from 'path';

import dotenv from 'dotenv';
import webpack from 'webpack';

import { BuildEnv, BuildPaths } from './config/build/types/config.types';
import { webpackConfig } from './config/build/webpackConfig';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    dotenv.config({ path: `.env.${mode}` });

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    };

    const isDev = mode === 'development';
    const port = env.port || Number(process.env.APP_PORT) || 3000;
    const analyze = env.analyze || false;
    const serverUrl =
        env.serverUrl || process.env.SERVER_URL || 'http://localhost:5000';
    const apiUrl =
        env.apiUrl || process.env.API_URL || 'http://localhost:5000/api';

    const config: webpack.Configuration = webpackConfig({
        mode,
        paths,
        isDev,
        port,
        analyze,
        apiUrl,
        serverUrl,
        project: 'frontend',
    });
    return config;
};
