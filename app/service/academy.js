'use strict';

const Service = require('egg').Service;

class AcademyService extends Service {
    /**
     * 
     * @param {*} payload 
     */
    async createOne(payload) {
        const { ctx } = this;
        const res = await ctx.model.Academy.create(payload);
        return {
          code: 0,
          data: res,
          message: "添加成功"
        }
    }

    async delete(name) {
      const { ctx } = this;
      const data = await ctx.model.Academy.findOne({
        where: {
          name: name
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此学院记录！" })
      } else {
        const res = await ctx.model.Academy.destroy({
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

module.exports = AcademyService;
