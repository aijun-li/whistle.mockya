import {
  deleteRule,
  deleteRuleData,
  getRule,
  getRuleData,
  insertRule,
  insertRuleData,
  syncCollectionUpdatedAt,
  updateRule,
  updateRuleData,
} from '@/database';
import Router from 'koa-router';
import { NewRule, NewRuleData, Rule, RuleData } from '~/typings';

const router = new Router();

router.get('/:ruleId', async (ctx) => {
  try {
    const data = await getRule(Number(ctx.params.ruleId));
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

router.post('/', async (ctx) => {
  try {
    const data = await insertRule(ctx.params.collectionId, ctx.request.body as NewRule);
    await syncCollectionUpdatedAt(ctx.params.collectionId);
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

router.put('/:ruleId', async (ctx) => {
  try {
    const data = await updateRule(Number(ctx.params.ruleId), ctx.request.body as unknown as Rule);
    await syncCollectionUpdatedAt(ctx.params.collectionId);
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

router.delete('/:ruleId', async (ctx) => {
  try {
    const data = await deleteRule(Number(ctx.params.ruleId));
    await syncCollectionUpdatedAt(ctx.params.collectionId);
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

router.get('/:ruleId/data/:ruleDataId', async (ctx) => {
  try {
    const data = await getRuleData(Number(ctx.params.ruleDataId));
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

router.post('/:ruleId/data', async (ctx) => {
  try {
    const data = await insertRuleData(ctx.request.body as NewRuleData, Number(ctx.params.ruleId));
    await syncCollectionUpdatedAt(ctx.params.collectionId);
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

router.put('/:ruleId/data/:ruleDataId', async (ctx) => {
  try {
    const data = await updateRuleData(Number(ctx.params.ruleDataId), ctx.request.body as unknown as RuleData);
    await syncCollectionUpdatedAt(ctx.params.collectionId);
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

router.delete('/:ruleId/data/:ruleDataId', async (ctx) => {
  try {
    const data = await deleteRuleData(Number(ctx.params.ruleDataId));
    await syncCollectionUpdatedAt(ctx.params.collectionId);
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
