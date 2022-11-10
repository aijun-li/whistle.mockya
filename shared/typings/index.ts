export * from './api';

export interface Collection {
  id: string;
  title: string;
  updatedAt: string;
}

export enum RuleType {
  http = 'http',
  rpc = 'rpc',
  all = 'all',
}
