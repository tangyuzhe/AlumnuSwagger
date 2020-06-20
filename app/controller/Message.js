'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Message
 */
class MessageController extends Controller {
  /**
   * @summary 添加消息发布
   * @description 添加消息发布
   * @router post /api/message/createMessage
   * @request body Message *body 
   * @response 200 Message 创建成功
   */
  async createMessage() {
    const { ctx, service } = this;
    ctx.body = await service.message.createMessage(ctx.request.body);
  }

  /**
   * @summary 查询消息列表
   * @description 查询消息列表
   * @router get /api/messages
   * @request query string *student_id
   * @request query integer *page
   * @request query integer *pagesize
   * @response 200 Message 查询成功
   */
  async findMessages() {
    const { ctx, service } = this;
    const student_id = ctx.query.student_id
    const page = ctx.query.page
    const pagesize = parseInt(ctx.query.pagesize)
    ctx.body = await service.message.findMessages(student_id, page, pagesize);
  }

  /**
   * @summary 修改消息
   * @description 修改消息
   * @router put /api/message/{id}
   * @request path integer *id
   * @request query integer *readStatus
   * @request query string *read_time
   * @response 200 Message 修改成功
   */
  async UpdateMessage() {
    const { ctx, service } = this;
    const id = ctx.params.id
    const readStatus = parseInt(ctx.query.readStatus)
    const readTime = ctx.query.readTime
    ctx.body = await service.message.updateReadStatus(id, readStatus, readTime);
  }

  /**
   * @summary 删除消息
   * @description 删除消息
   * @router delete /api/message/{id}
   * @request path integer *id
   * @response 200 Message 删除成功
   */
  async deleteMessage() {
    const { ctx, service } = this;
    const id = ctx.params.id
    ctx.body = await service.message.deleteMessage(id);
  }
}
module.exports = MessageController;
