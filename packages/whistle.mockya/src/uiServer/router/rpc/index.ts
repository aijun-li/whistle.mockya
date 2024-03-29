import { mergeRouters } from '@/tools/trpc';
import type Koa from 'koa';
import { createKoaMiddleware } from 'trpc-koa-adapter';
import collectionRouter from './collection';
import matcherRouter from './matcher';
import matcherConditionRouter from './matcher-condition';
import miscRouter from './misc';
import mockRouter from './mock';
import mockHeaderRouter from './mock-header';
import ruleRouter from './rule';
import ruleConditionRouter from './rule-condition';
import statRouter from './stat';
import versionUpdateRouter from './version-update';
import logger from '@/logger';

const RPC_PREFIX = '/trpc';

export const trpcRouter = mergeRouters(
  collectionRouter,
  ruleRouter,
  ruleConditionRouter,
  mockRouter,
  mockHeaderRouter,
  matcherRouter,
  matcherConditionRouter,
  versionUpdateRouter,
  statRouter,
  miscRouter,
);

export type AppRouter = typeof trpcRouter;

export function setupRouterRPC(app: Koa) {
  const adapter = createKoaMiddleware({
    router: trpcRouter,
    prefix: RPC_PREFIX,
    onError: (opts) => {
      logger.error(
        JSON.stringify(
          {
            error: {
              code: opts.error.code,
              name: opts.error.name,
              message: opts.error.message,
              stack: opts.error.stack,
              cause: opts.error.cause,
            },
            path: opts.path,
          },
          null,
          2,
        ),
      );
    },
  });

  app.use(adapter);
}
