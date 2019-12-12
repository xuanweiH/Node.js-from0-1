const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async get() { // 查询
    const ctx = this.ctx;
    const info = await ctx.service.category.getCateInfo();
    ctx.body = {
        code:0,
        msg:'success!',
        data: info
    };
  }
  async create() { // 新增
    const ctx = this.ctx;
    const options = ctx.request.body
    const info = await ctx.service.category.addCateInfo(options);
    ctx.body = {
        code:0,
        msg:'success!',
        data: info
    };
  }
  async update() {
    const ctx = this.ctx;
    const formData = ctx.request.body
    const { id } = ctx.params;
    const info = await ctx.service.category.updateCateInfo(id,formData);
    ctx.body = {
        code:0,
        msg:'success!',
        data: info
    };
  }
  async remove() {
    const {ctx} = this
    const {id} = ctx.params
    let info =  await ctx.service.category.removeCateInfo(id);//调用Service层传参
    ctx.body = {
        code:0,
        msg:'success!',
        data: info
    };
  }
}
module.exports = CategoryController;