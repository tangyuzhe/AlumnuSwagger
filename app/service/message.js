'use strict';
const Service = require('egg').Service;

class MessageService extends Service {
  /**
   * 创建反馈
   * @param {*} message 
   */
  async createMessage(message) {
    const { ctx } = this;
    const res = await ctx.model.Message.create(message)
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }


  /**
   * 查询消息反馈列表
   * @param {*} student_id 
   * @param {*} page 
   * @param {*} pagesize 
   */
  async findMessages(student_id, page, pagesize) {
    const { ctx } = this;
    const res = await ctx.model.Message.findAll({
      offset: (page - 1) * pagesize,
      limit: pagesize,
      where: {
        student_id: student_id
      }
    })
    return {
      code: 0,
      message: '查询成功',
      data: res,
      total: res.length
    }
  }

  /**
   * 修改阅读状态
   * @param {*} id 
   * @param {*} read_status 
   */
  async updateReadStatus(id, read_status) {
    const { ctx } = this;
    const data = await ctx.model.Message.findByPk(id)
    if (!data) {
      ctx.throw(404, { code: 1, message: '查无数据' })
    } else {
      const res = await ctx.model.Message.update({
        read_status: read_status
      }, {
        where: {
          id: id
        }
      })
      if (!res) {
        ctx.throw(407, { code: 1, message: '修改失败' })
      } else {
        return {
          code: 0,
          message: '修改成功',
          data: res
        }
      }
    }
  }

  /**
   * 删除消息
   * @param {*} id 
   */
  async deleteMessage(id) {
    const { ctx } = this;
    const data = await ctx.model.Message.findByPk(id)
    if (!data) {
      ctx.throw(404, { code: 1, message: '查无数据' })
    } else {
      const res = await ctx.model.Message.destroy({
        where: { id: id }
      })
      return {
        code: 0,
        message: '删除成功'
      }
    }
  }

}

module.exports = MessageService;
