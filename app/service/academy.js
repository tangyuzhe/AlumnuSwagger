'use strict';

const Service = require('egg').Service;

class AcademyService extends Service {
    /**
     * 新增学院记录
     * @param {*} payload 
     */
    async createOne(payload) {
        const { ctx } = this;
        const res = await ctx.model.Academy.create(payload);
        return {
          code: 0,
          data: res,
          message: "添加成功！"
        }
    }

    /**
     * 根据名称删除学院记录
     * @param {*} name 
     */
    async deleteByName(name) {
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

    /**
     * 根据输入id删除学院记录
     * @param {*} id 
     */
    async deleteById(id) {
      const { ctx } = this;
      const data = await ctx.model.Academy.findOne({
        where: {
          id: id
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此学院记录！" })
      } else {
        const res = await ctx.model.Academy.destroy({
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
     * 根据输入学院代码删除学院记录
     * @param {*} number 
     */
    async deleteByNumber(number) {
      const { ctx } = this;
      const data = await ctx.model.Academy.findOne({
        where: {
          number: number
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此学院记录！" })
      } else {
        const res = await ctx.model.Academy.destroy({
          where: {
            number: number
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
   * 更新学院记录
   * @param {*} id 
   * @param {*} payload 
   */
  async update(id, payload) {
    const { ctx } = this;
    const res = await ctx.model.Academy.update(payload, {
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
   * 获取学院信息列表
   * @param {*} page 
   * @param {*} pagesize 
   */
  async getAcademyList(page, pagesize) {
    const { ctx } = this;
    const res = await ctx.model.Academy.findAll({
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
   * 根据学院编号Number查询学院信息
   * @param {*} number
   */
  async findByNumber(number) {
    const { ctx } = this;
    const res = await ctx.model.Academy.findAll({
      where: {
        number: number
      }
    })
    return {
      code: 0,
      data: res,
      total: res.length,
      message: "查询成功！"
    }
  }

  /**
   * 根据学院名称查询学院信息
   * @param {*} name
   */
  async findByName(name) {
    const { ctx } = this;
    const res = await ctx.model.Academy.findAll({
      where: {
        name: name
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
        message: "查询失败！"
      }
  
    }
  }
}

module.exports = AcademyService;
