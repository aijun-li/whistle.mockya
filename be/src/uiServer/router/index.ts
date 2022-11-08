import Router from 'koa-router';
import collection from './collection';
import hint from './hint';

// For help see https://github.com/ZijianHe/koa-router#api-reference
export default (router: Router) => {
  router.prefix('/api');

  router.use('/collection', collection.routes());
  router.use('/hint', hint.routes());
};
