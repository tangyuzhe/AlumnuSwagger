'use strict';

const Service = require('egg').Service;

class MajorService extends Service {
    /**
     * 
     * @param {*} payload 
     */
    async createOne(payload) {
        const { ctx } = this;
        const res = await ctx.model.Major.create(payload);
        return {
          code: 0,
          data: res,
          message: "添加成功"
        }
    }
}

module.exports = MajorService;
