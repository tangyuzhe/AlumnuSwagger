'use strict';

const Service = require('egg').Service;

class JobService extends Service {
    /**
     * 添加职业记录
     * @param {*} payload 
     */
    async createOne(payload) {
      const { ctx } = this;
      const res = await ctx.model.Job.create(payload);
      return {
        code: 0,
        data: res,
        message: "添加成功"
      }
    }

    /**
     * 根据输入名称删除职业记录
     * @param {*} name 
     */
    async delete(name) {
      const { ctx } = this;
      const data = await ctx.model.Job.findOne({
        where: {
          name: name
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此职业记录！" })
      } else {
        const res = await ctx.model.Job.destroy({
          where: {
            name: name
          }
        })
        return {
          code: 0,
          data: res,
          message: '删除成功'
        }
      }
    }
    
}

module.exports = JobService;
