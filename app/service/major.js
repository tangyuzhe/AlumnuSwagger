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
     * 根据输入名称删除专业记录
     * @param {*} name 
     */
    async deleteByName(name) {
      const { ctx } = this;
      const data = await ctx.model.Major.findOne({
        where: {
          name: name
        }
      });
      if (!data) {
        ctx.throw(404, { code: 1, message: "没有此专业记录！" })
      } else {
        const res = await ctx.model.Major.destroy({
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
     * 根据输入id删除专业记录
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
     * 根据输入academy删除专业记录
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
}

module.exports = MajorService;
