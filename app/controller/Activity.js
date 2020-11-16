'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Activity 
 */
class ActivityController extends Controller {
  /**
   * @summary 创建活动信息
   * @description 新建一条活动信息
   * @router post /api/activity/createActivity
   * @request body Activity *body 
   * @response 200 Activity 创建成功
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.activity.create(data)
  }

  /**
   * @summary 修改活动信息
   * @description 修改一条活动信息
   * @router put /api/activity/updateActivity
   * @request query integer *id
   * @request query integer current_quantity
   * @request query integer finished
   * @response 200 Activity 创建成功
   * @apikey
   */
  async update() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    const current_quantity = ctx.query.current_quantity;
    const finished = ctx.query.finished
    ctx.body = await service.activity.updateActivity(id, current_quantity, finished)
  }

  /**
   * @summary 获取活动列表
   * @description 获取活动列表
   * @router get /api/activities
   * @request query integer *page
   * @request query integer *pagesize
   * @request query integer finished
   * @request query string remarks
   * @response 200 Activity 查询成功
   * @apikey
   */
  async findAll() {
    const { ctx, service } = this;
    const page = ctx.query.page;
    const pagesize = parseInt(ctx.query.pagesize);
    const finished = ctx.query.finished
    const remarks = ctx.query.remarks;
    ctx.body = await service.activity.getActivityList(page, pagesize,finished,remarks)
  }

  /**
   * @summary 获取活动
   * @description 获取活动,可根据任意一个进行查询
   * @router get /api/activity
   * @request query integer id
   * @request query string theme
   * @response 200 Activity 查询成功
   * @apikey
   */
  async findOne() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    const theme = ctx.query.theme;
    console.log(id == undefined)
    ctx.body = await service.activity.findOne(id, theme)
  }

  /**
   * @summary 删除活动
   * @description 删除活动
   * @router delete /api/activity/{id}
   * @request path integer *id
   * @response 200 Activity 删除成功
   * @apikey
   */
  async delete() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    ctx.body = await service.activity.delete(id)
  }

  /**
   * @summary 修改活动
   * @description 修改活动
   * @router put /api/activity/update/{id}
   * @request path integer *id
   * @request body Activity *body
   * @response 200 Activity 修改成功
   * @apikey
   */
  async updateOne() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    ctx.body = await service.activity.updateOne(id, data)
  }
}
module.exports = ActivityController;
