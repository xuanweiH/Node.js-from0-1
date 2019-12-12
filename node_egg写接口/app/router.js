'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 增删改查账单接口列表

  router.get('/api/v1/record/list', controller.record.getData);
  router.post('/api/v1/record/add', controller.record.addData);
  router.post('/api/v1/record/update', controller.record.updateData);
  router.get(`/api/v1/record/remove/:id`, controller.record.removeData);
  // 增删改查账目分类接口
  router.get('/api/v1/category/list', controller.category.get);
  router.post('/api/v1/category/add', controller.category.create);
  router.post('/api/v1/category/update', controller.category.update);
  router.get('/api/v1/category/remove/:id', controller.category.remove);
};
