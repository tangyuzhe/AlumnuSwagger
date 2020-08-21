'use strict';

const Service = require('egg').Service;

class MajorService extends Service {
    /**
     * 新增专业记录
     * @param {*} payload 
     */
    async createOne(payload) {
        const { ctx } = this;
        const res = await ctx.model.Major.create(payload);
        return {
          code: 0,
          data: res,
          message: "添加成功！"
        }
    }

    /**
     * 根据id删除专业记录
     * @param {*} id 
     */
    async deleteById(id) {
      const { ctx } = this;
      const data = await ctx.model.Major.findOne({
        where: {
          id: id
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此专业记录！" })
      } else {
        const res = await ctx.model.Major.destroy({
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
     * 根据输入academy批量删除专业记录
     * @param {*} academy 
     */
    async deleteByAcademy(academy) {
      const { ctx } = this;
      const data = await ctx.model.Major.findOne({
        where: {
          academy: academy
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此专业记录！" })
      } else {
        const res = await ctx.model.Major.destroy({
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
   * 更新专业记录
   * @param {*} id 
   * @param {*} payload
   */
  async update(id, payload) {
    const { ctx } = this;
    const res = await ctx.model.Major.update(payload, {
      where: {
        id: id
      }
    })
    return {
      code: 0,
      data: res,
      message: '更新成功!'
    }
  }

  /**
   * 获取专业信息列表
   * @param {*} page 
   * @param {*} pagesize 
   */
  async getMajorList(page, pagesize) {
    const { ctx } = this;
    const res = await ctx.model.Major.findAll({
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
   * 根据本硕标志获取专业信息列表
   * @param {*} mark
   */
  async findByMark(mark) {
    const { ctx } = this;
    const res = await ctx.model.Major.findAll({
      where: {
        mark: mark
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

  /**
   * 根据学院id获取专业信息列表
   * @param {*} academy
   */
  async findByAcademy(academy) {
    const { ctx } = this;
    const res = await ctx.model.Major.findAll({
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

module.exports = MajorService;
