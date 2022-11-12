export * from './api';
export interface BaseCollection {
    id: string;
    title: string;
    updatedAt: string;
}
export interface Collection extends BaseCollection {
    rules: Rule[];
}
export declare enum RuleType {
    http = "http",
    rpc = "rpc",
    all = "all"
}
export interface RuleData {
    id: number;
    label: string;
    value: string;
}
export declare type NewRuleData = Omit<RuleData, 'id'>;
export interface Rule {
    id: number;
    type: Omit<RuleType, RuleType.all>;
    pattern: string;
    enabled: boolean;
    delay: number;
    activeId: number;
    data: RuleData[];
    desc?: string;
}
export declare type NewRule = Omit<Rule, 'id' | 'activeId' | 'data'>;
