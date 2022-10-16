import { deleteCollection, getCollection, upsertCollection } from '@/database';
import Router from 'koa-router';
import { UpsertCollectionParams } from '~/typings';

const collection = new Router();

async function upsertCollectionRoute(params: UpsertCollectionParams) {
  try {
    const { id, title } = params;
    const res = await upsertCollection({ id, title });

    return {
      code: 0,
      msg: '',
      data: res,
    };
  } catch (error) {
    console.error(error);
    return {
      code: -1,
      msg: error.message.split('\n').pop(),
    };
  }
}

collection.post('/', async (ctx) => {
  ctx.body = await upsertCollectionRoute(ctx.request.body as unknown as UpsertCollectionParams);
});

collection.put('/:id', async (ctx) => {
  ctx.body = await upsertCollectionRoute({
    ...ctx.request.body,
    id: ctx.params.id,
  } as unknown as UpsertCollectionParams);
});

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
