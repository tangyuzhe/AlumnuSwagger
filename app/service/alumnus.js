'use strict';
const Service = require('egg').Service;

class AlumnusService extends Service {
  /**
   * 创建校友信息
   * @param {*} payload 
   */
  async createAlumnu(payload) {
    const { ctx } = this;
    const res = await ctx.model.Alumnus.create(payload)
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }

  /**
   * 通过姓名查询
   * @param {*} alumnuName 
   */
  async findAlumnu(alumnuName) {
    const { ctx } = this;
    const res = await ctx.model.Alumnus.findOne({
      where: {
        name: alumnuName
      }
    })
    if (!res) {
      ctx.throw(404, { code: 1, message: '该校友未查询到其信息' })
    } else {
      return {
        code: 0,
        message: '查询成功',
        data: res
      }
    }
  }

  /**
   * 删除校友信息
   * @param {*} id 
   */
  async deleteAlumnu(id) {
    const { ctx } = this;
    const res = await ctx.model.Alumnus.findByPk(id)
    if (!res) {
      ctx.throw(404, { code: 1, message: "查询不到校友信息" })
    } else {
      ctx.model.Alumnus.destroy({
        where: {
          id: id
        }
      })
      ctx.throw(200, { code: 0, message: "删除成功", data: res })
    }
  }

  /**
   * 校友信息更新
   * @param {*} id 
   * @param {*} payload 
   */
  async updateAlumnu(id, payload) {
    const { ctx } = this;
    const res = await ctx.model.Alumnus.findByPk(id)
    if (!res) {
      ctx.throw(404, { code: 1, message: "查询不到校友信息" })
    } else {
      ctx.model.Alumnus.update(payload, {
        where: {
          id: id
        }
      })
      ctx.throw(200, { code: 0, message: "修改成功" })
    }
  }


  async findAll() {
    const { ctx } = this;
    const res = await ctx.model.Alumnus.findAndCountAll()
    if (!res) {
      ctx.throw(404, { code: 1, message: "无数据" })
    } else {
      return {
        code: 0,
        data: res.rows,
        total: res.count,
        message: "查询成功"
      }
    }
  }
}

module.exports = AlumnusService;
