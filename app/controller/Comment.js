'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Comment 
 */
class CommentController extends Controller {
  /**
   * @summary 提交反馈意见
   * @description 提交反馈意见
   * @router post /api/comment/createComment
   * @request body Comment *body 
   * @response 200 Comment 创建成功
   * @apikey
   */
  async createComment() {
    const { ctx, service } = this;
    let comment = ctx.request.body;
    ctx.body = await service.comment.createComment(comment);
  }
}
module.exports = CommentController;
