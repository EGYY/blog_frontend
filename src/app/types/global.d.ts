declare module '*.scss';
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare const __IS_DEV__: boolean;
declare const __SERVER_URL__: string;
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
