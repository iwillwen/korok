import Korok from './korok';
export declare class KorokParamsStore {
    private pageScopedParamGetters;
    registerParam(key: string, korok: Korok): void;
    has(key: string): string;
    get(key: string): any;
    clear(): void;
}
declare const _default: KorokParamsStore;
export default _default;
