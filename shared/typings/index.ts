export * from './api';

export interface BaseCollection {
  id: string;
  title: string;
  updatedAt: string;
}

export interface Collection extends BaseCollection {
  rules: Rule[];
}

export enum RuleType {
  http = 'http',
  rpc = 'rpc',
}

export interface RuleData {
  id: number;
  label: string;
  value: string;
}

export type NewRuleData = Omit<RuleData, 'id'>;

export interface Rule {
  id: number;
  type: RuleType;
  pattern: string;
  enabled: boolean;
  delay: number;
  activeId: number;
  collectionId: string;
  data: RuleData[];
  desc?: string;
}

export type NewRule = Omit<Rule, 'id' | 'activeId' | 'data' | 'collectionId'>;
