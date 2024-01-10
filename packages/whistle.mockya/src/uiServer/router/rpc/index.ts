import { mergeRouters } from '@/tools/trpc';
import type Koa from 'koa';
import { createKoaMiddleware } from 'trpc-koa-adapter';
import collectionRouter from './collection';
import matcherRouter from './matcher';
import matcherConditionRouter from './matcher-condition';
import mockRouter from './mock';
import mockHeaderRouter from './mock-header';
import ruleRouter from './rule';
import ruleConditionRouter from './rule-condition';

const RPC_PREFIX = '/trpc';

export const trpcRouter = mergeRouters(
  collectionRouter,
  ruleRouter,
  ruleConditionRouter,
  mockRouter,
  mockHeaderRouter,
  matcherRouter,
  matcherConditionRouter,
);

export type AppRouter = typeof trpcRouter;

export function setupRouterRPC(app: Koa) {
  const adapter = createKoaMiddleware({
    router: trpcRouter,
    prefix: RPC_PREFIX,
  });

  app.use(adapter);
}
