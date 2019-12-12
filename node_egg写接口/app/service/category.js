const Service = require('egg').Service;
// this.app.mysql.query(sql, values); //sql语句模式

class AddCateGory extends Service {
    async getCateInfo() {
        const result = await this.app.mysql.select('bills_category');
        return {result};
    }
    async addCateInfo(options) {
    
        const result = await this.app.mysql.insert('bills_category',options);
        return {result};
    }
    async updateCateInfo(params,formData){
        const options = {
            where: {
              id: params,
            },
          };
        const result = await this.app.mysql.update('bills_category',formData,options);
        return {result};
    }
    async removeCateInfo(params) {
        const result = await this.app.mysql.delete('bills_category',{id:params});
        return {result};
    }
}
module.exports = AddCateGory;


