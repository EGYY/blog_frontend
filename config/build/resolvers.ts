import { ResolveOptions } from "webpack";

export function resolvers(): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}