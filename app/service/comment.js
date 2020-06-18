'use strict';
const Service = require('egg').Service;

class CommentService extends Service {
  /**
   * 创建反馈
   * @param {*} comment 
   */
  async createComment(comment) {
    const { ctx } = this;
    const res = await ctx.model.Comment.create(comment)
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }

}

module.exports = CommentService;
