import { deleteCollection, getCollection, getCollections, upsertCollection } from '@/database';
import Router from 'koa-router';
import { UpsertCollectionParams } from '~/typings';

const router = new Router();

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

router.post('/', async (ctx) => {
  ctx.body = await upsertCollectionRoute(ctx.request.body as unknown as UpsertCollectionParams);
});

router.put('/:id', async (ctx) => {
  ctx.body = await upsertCollectionRoute({
    ...ctx.request.body,
    id: ctx.params.id,
  } as unknown as UpsertCollectionParams);
});

router.get('/', async (ctx) => {
  try {
    const data = await getCollections();

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

router.get('/:id', async (ctx) => {
  try {
    const data = await getCollection(ctx.params.id);

    ctx.body = {
      code: 0,
      msg: '',
      data,
    };
  } catch (error) {
    console.error(error);
    ctx.body = {
      code: -1,
      msg: error.message.splice('\n').pop(),
    };
  }
});

router.delete('/:id', async (ctx) => {
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

export default router;
