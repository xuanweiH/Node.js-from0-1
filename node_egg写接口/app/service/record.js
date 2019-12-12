const Service = require('egg').Service;
// this.app.mysql.query(sql, values); //sql语句模式

class RecordBills extends Service {
    // 查询账单
    async getInfo() {
        console.log(this.app.mysql)
        // const result = await this.app.mysql.select('record_bills');
        // const newRes = []
        // let tableData = {}
        // result.forEach(v => {
        //     tableData =  this.app.mysql.get('bills_category',{id:v.category_id})
        //     newRes.push[{...v,...tableData}]
        // });
        // console.log(result,newRes)
        // return {newRes};
        const result = await this.app.mysql.query(
            `SELECT
            r.id,
            r.amount,
            r.time,
            r.remark,
            b.category_name,
            b.category_type 
        FROM
            record_bills r
            LEFT JOIN bills_category b ON r.category_id = b.id 
        `);
        return {result} 
    }
    // 添加账单
    async addInfo(options) {
        const result = await this.app.mysql.insert('record_bills',options);
        return {result};
    }
    // 更新账单
    async updateInfo(data) {
        // const options = {
        //     where:{
        //         id:params,
        //     }
        // }
        const result = await this.app.mysql.update('record_bills',data);
        return {result};
    }
    // 删除账单记录
    async removeInfo(params) {
        const result = await this.app.mysql.delete('record_bills',{id:params});
        return {result};
    }
}

    

module.exports = RecordBills;
