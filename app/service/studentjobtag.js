'use strict';
const Service = require('egg').Service;

class StudentJobTagService extends Service {
  /**
   * 创建反馈
   * @param {*} tag 
   */
  async createTag(tag) {
    const { ctx } = this;
    const res = await ctx.model.StudentJobTag.create(tag)
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }

  /**
   * 
   * @param {*} student_id 
   */
  async findTags(student_id) {
    const { ctx } = this;
    const res = await ctx.model.StudentJobTag.findAll({
      where: {
        student_id: student_id
      }
    })
    if (!res) {
      ctx.throw(404, { code: 1, message: '查无数据' })
    } else {
      return {
        code: 0,
        message: '添加成功',
        data: res,
        total: res.length
      };
    }
  }

  /**
   * 删除职务
   * @param {*} id 
   */
  async deleteTag(id) {
    const { ctx } = this;
    const data = await ctx.model.StudentJobTag.findByPk(id);
    if (!data) {
      ctx.throw(405, { code: 1, message: '查无数据' })
    } else {
      const res = await ctx.model.StudentJobTag.destroy({
        where: {
          id: id
        }
      });
      if (!res) {
        ctx.throw(406, { code: 1, message: '删除失败' })
      } else {
        return {
          code: 0,
          message: '删除成功'
        }
      }
    }
  }

}

module.exports = StudentJobTagService;
