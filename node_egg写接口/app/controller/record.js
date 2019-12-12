const Controller = require('egg').Controller;

class RecordController extends  Controller{  //类名大写
    async getData(){  // async await 异步
        const {ctx} = this
        let info =  await ctx.service.record.getInfo();//调用Service层传参
        ctx.body = {
            code:0,
            msg:'success!',
            data: info
        };
    }
    async addData(){  // async await 异步
        const {ctx} = this
        let options = ctx.request.body
        let info =  await ctx.service.record.addInfo(options);//调用Service层传参
        ctx.body = {
            code:0,
            msg:'success!',
            data: info
        };
    }
    async updateData(){  // async await 异步
        const {ctx} = this
        // const {id} = ctx.params
        const data = ctx.request.body
        let info =  await ctx.service.record.updateInfo(data);//调用Service层传参
        ctx.body = {
            code:0,
            msg:'success!',
            data: info
        };
    }
    async removeData(){  // async await 异步
        const {ctx} = this
        const {id} = ctx.params
        let info =  await ctx.service.record.removeInfo(id);//调用Service层传参
        ctx.body = {
            code:0,
            msg:'success!',
            data: info
        };
    }
  }
  module.exports= RecordController;

  