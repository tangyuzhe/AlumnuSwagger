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
   * @apikey
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
   * @apikey
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
   * @request query string *readTime
   * @response 200 Message 修改成功
   * @apikey
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
   * @apikey
   */
  async deleteMessage() {
    const { ctx, service } = this;
    const id = ctx.params.id
    ctx.body = await service.message.deleteMessage(id);
  }


  /**
   * @summary 根据新闻id查询消息列表
   * @description 根据新闻id查询消息列表
   * @router get /api/messages/newsId
   * @request query string *news_id
   * @request query integer page
   * @request query integer pagesize
   * @response 200 Message 查询成功
   * @apikey
   */
  async findMessagesById() {
    const { ctx, service } = this;
    const news_id = ctx.query.news_id
    const page = ctx.query.page
    const pagesize = parseInt(ctx.query.pagesize)
    ctx.body = await service.message.findMessagesByNewsID(news_id, page, pagesize);
  }
}
module.exports = MessageController;
