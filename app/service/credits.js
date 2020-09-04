'use strict';

const Service = require('egg').Service;

class CreditsService extends Service {
    /**
     * 
     * @param {string} sno 
     */
  async findCredits(sno) {
    const { ctx } = this;
    const res = await ctx.model.Credits.findAll({
    where: {
        sno: sno
    }
    });
    if (!res) {
        ctx.throw(404, { code: 1, message: "没有记录！" })
    } else{
        return {
            code: 0,
            data: res,
            message: '查找成功!'
        }
    }
  }
}

module.exports = CreditsService;
