export * from './api';
export interface Collection {
    id: string;
    title: string;
    updatedAt: string;
}
export declare enum RuleType {
    http = "http",
    rpc = "rpc"
}
