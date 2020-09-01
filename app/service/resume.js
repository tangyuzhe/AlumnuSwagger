'use strict';

const Service = require('egg').Service;

class ResumeService extends Service {
  /**
   * 查询
   * @param {string} sno 
   */
  async findResume(sno) {
    const { ctx } = this;
    const res = await ctx.model.Resume.findAll({
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

  /**
   * 
   * @param {object} payload 
   */
  async create(payload){
    const { ctx } = this;
    const res = await ctx.model.Resume.create(payload);
    return {
        code: 0,
        data: res,
        message: "添加成功！"
    }
  }
}

module.exports = ResumeService;
