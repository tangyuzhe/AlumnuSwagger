'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class JobService extends Service {
  /**
   * 新增职业信息
   * @param {object} payload 
   */
  async createOne(payload) {
    const { ctx } = this;
    const res = await ctx.model.Job.create(payload);
    if (res) {
      return {
        code: 0,
        data: res,
        message: "添加成功！"
      }
    } else {
      return {
        code: 1,
        data: res,
        message: "添加失败！"
      }
    }
  }

  /**
   * 根据输入id删除职业记录
   * @param {Integer} id 
   */
  async deleteById(id) {
    const { ctx } = this;
    const data = await ctx.model.Job.findOne({
      where: {
        id: id
      }
    });
    if (!data) {
      ctx.throw(404, { code: 1, message: "没有此职业记录！" })
    } else {
      const res = await ctx.model.Job.destroy({
        where: {
          id: id
        }
      })
      return {
        code: 0,
        data: res,
        message: '删除成功!'
      }
    }
  }

  /**
   * 根据输入academy批量删除职业记录
   * @param {Integer} academy 
   */
  async deleteByAcademy(academy) {
    const { ctx } = this;
    const data = await ctx.model.Job.findOne({
      where: {
        academy: academy
      }
    });
    if (!data) {
      ctx.throw(404, { code: 1, message: "没有符合条件的职业记录！" })
    } else {
      const res = await ctx.model.Job.destroy({
        where: {
          academy: academy
        }
      })
      return {
        code: 0,
        data: res,
        message: '删除成功!'
      }
    }
  }

  /**
   * 更新职业记录
   * @param {Integer} id 
   * @param {object} payload 
   */
  async update(id, payload) {
    const { ctx } = this;
    const res = await ctx.model.Job.update(payload, {
      where: {
        id: id
      }
    });
    return {
      code: 0,
      data: res,
      message: '更新成功!'
    }
  }

  /**
   * 获取职业信息列表
   * @param {Integer} page 
   * @param {Integer} pagesize 
   */
  async getJobList(page, pagesize) {
    const { ctx } = this;
    const res = await ctx.model.Job.findAll({
      offset: (page - 1) * pagesize,
      limit: pagesize
    })
    return {
      code: 0,
      data: res,
      total: res.length,
      message: "查询成功！"
    }
  }
    
  /**
   * 根据职业名称模糊查询职业信息
   * @param {string} name
   */
  async findByName(name) {
    const { ctx } = this;
    const res = await ctx.model.Job.findAll({
      where: {
        name: {[Op.like]: '%' + name + '%'}
      }
    });
    if (res.length) {
      return {
        code: 0,
        data: res,
        total: res.length,
        message: "查询成功！"
      }
  
    } else {
      return {
        code: 1,
        data: res,
        total: res.length,
        message: "查询失败,不存在符合条件的记录！"
      }
    }
  }

  /**
   * 根据职业所属学院范畴查询职业列表
   * @param {Integer} academy
   */
  async findByAcademy(academy) {
    const { ctx } = this;
    const res = await ctx.model.Job.findAll({
      where: {
        academy: academy
      }
    })
    if (res.length) {
      return {
        code: 0,
        data: res,
        total: res.length,
        message: "查询成功！"
      }
  
    } else {
      return {
        code: 1,
        data: res,
        total: res.length,
        message: "查询失败,不存在符合条件的记录！"
      }
    }
  }
}

module.exports = JobService;
