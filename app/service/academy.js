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
}

module.exports = AcademyService;
