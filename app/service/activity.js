'use strict';
const Service = require('egg').Service;
class ActivityService extends Service {
  /**
   * 添加活动信息
   *  @param {*} payload 
   */
  async create(payload) {
    const { ctx } = this;
    const res = await ctx.model.Activity.create(payload);
    return {
      code: 0,
      data: res,
      message: "添加成功"
    }
  }

  /**
   * 
   * @param {*} id 
   * @param {*} current_quantity 
   * @param {*} finished 
   */
  async updateActivity(id, current_quantity, finished) {
    const { ctx } = this;
    const data = await ctx.model.Activity.findByPk(id);
    if (!data) {
      ctx.throw(404, { code: 1, message: "未查询到该活动" })
    } else {
      const res = await ctx.model.Activity.update({
        current_quantity: current_quantity,
        finished: finished
      }, { where: { id: id } })
      return {
        code: 0,
        data: res,
        message: "修改成功"
      }
    }
  }

  /**
   * 获取活动列表
   * @param {*} page 
   * @param {*} pagesize 
   */
  async getActivityList(page, pagesize) {
    const { ctx } = this;
    const res = await ctx.model.Activity.findAll({
      offset: (page - 1) * pagesize,
      limit: pagesize
    })
    return {
      code: 0,
      data: res,
      total: res.length,
      message: "查询成功"
    }
  }

  /**
   * 
   * @param {*} id 
   * @param {*} theme 
   */
  async findOne(id, theme) {
    const { ctx } = this;
    let res;
    if (theme == undefined) {
      res = await ctx.model.Activity.findByPk(id)
    }
    if (id == undefined) {
      res = await ctx.model.Activity.findAll({
        where: {
          theme: theme
        }
      })
    }
    if (id != undefined && theme != undefined) {
      res = await ctx.model.Activity.findAll({
        where: {
          id: id,
          theme: theme
        }
      })
    }
    if (res.length == 0) {
      ctx.throw(404, { code: 1, message: "无法查询到此活动" })
    } else {
      return {
        code: 0,
        data: res,
        message: "查询成功"
      }
    }
  }

  /**
   * 
   * @param {*} id 
   */
  async delete(id) {
    const { ctx } = this;
    const data = await ctx.model.Activity.findByPk(id);
    if (!data) {
      ctx.throw(404, { code: 1, message: "查无此活动" })
    } else {
      const res = await ctx.model.Activity.destroy({
        where: {
          id: id
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


module.exports = ActivityService;
