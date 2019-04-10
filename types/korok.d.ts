/// <reference types="node" />
export declare enum PropType {
    'string' = 0,
    'number' = 1,
    'boolean' = 2,
    'json' = 3
}
export interface IKorokProp {
    key?: string;
    default?: any;
    description?: string;
    type?: PropType;
    title?: string;
    required?: boolean;
}
export interface IKorokParam {
    key?: string;
    description?: string;
    scope?: 'korok' | 'page';
}
export declare const BINDING_COLUMN_REGEX: RegExp;
export declare const BINDING_COLUMNS_REGEX: RegExp;
declare class KorokProxy {
    private key;
    constructor(key: string);
    registerProp(key: string, options?: IKorokProp): this;
    registerParam(key: string, options?: IKorokParam): this;
}
export default class Korok {
    private static koroks;
    private static regularProps;
    private static korokPropsMap;
    private static korokParamsMap;
    static PropTypes: typeof PropType;
    static messageBus: import("events").EventEmitter;
    static register(key: string, comp: any): KorokProxy;
    static get(key: string): any;
    static registerRegularProp(key: string, option?: IKorokProp): void;
    static registerProp(korokKey: string, key: string, options?: IKorokProp): void;
    static registerParam(korokKey: string, key: string, options?: IKorokParam): void;
    private key;
    private id;
    private props;
    private paramsFunc;
    private reactionCallback;
    readonly Korok: typeof Korok;
    constructor(key: string, props?: any);
    reaction(reactionCallback: () => any): this;
    compose(reactionCallback?: () => any): this;
    dispose(): this;
    dispatch(): this;
    setProp(key: string, value: any): this;
    setProps(props: {
        [key: string]: any;
    }): this;
    getPropsList(): IKorokProp[];
    getParamsList(): IKorokParam[];
    bindParam(paramsFunc: () => {
        [key: string]: any;
    }): this;
    serializationParams(): {
        [key: string]: any;
    };
    getColumnField(pattern: string): string;
    getProp<T>(key: string): T | null;
    getOriginalProp<T>(key: string): T | null;
    getParam<T>(key: string): T;
    private getColumn;
    processColumnBinding(value: string): {};
}
export {};
