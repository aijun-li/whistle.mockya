import { deleteCollection, getCollection, upsertCollection } from '@/database';
import { UpsertCollectionParams } from '@shared/typings';
import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

const collection = new Router();

async function upsertCollectionRoute(ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) {
  try {
    const { id, title } = ctx.request.body as unknown as UpsertCollectionParams;
    const res = await upsertCollection({ id, title });

    ctx.body = {
      code: 0,
      msg: '',
      data: res,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      code: -1,
      msg: error.message.split('\n').pop(),
    };
  }
}

collection.post('/', upsertCollectionRoute);

collection.put('/', upsertCollectionRoute);

collection.get('/', async (ctx) => {
  try {
    const data = await getCollection();

    ctx.body = {
      code: 0,
      msg: '',
      data,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      code: -1,
      msg: error.message.split('\n').pop(),
    };
  }
});

collection.delete('/:id', async (ctx) => {
  try {
    const data = await deleteCollection(ctx.params.id);

    ctx.body = {
      code: 0,
      msg: '',
      data,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      code: -1,
      msg: error.message.split('\n').pop(),
    };
  }
});

// For help see https://github.com/ZijianHe/koa-router#api-reference
export default (router: Router) => {
  // router.get('/cgi-bin/init', (ctx) => {
  //   ctx.body = 'Hello whistle.';
  // });

  router.prefix('/api');
  router.use('/collection', collection.routes());
};
