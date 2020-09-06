'use strict';

const Controller = require('egg').Controller;
/**
 * @controller Academy
 */
class AcademyController extends Controller {
  /**
   * @summary 新增学院信息
   * @description 新增一条学院信息记录
   * @router post /api/academy/create
   * @request body Academy *body 
   * @response 200 Academy 增加成功！
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    ctx.body = await service.academy.createOne(ctx.request.body);
  }

  /**
   * @summary 根据id删除学院记录
   * @description 根据id删除学院记录
   * @router delete /api/academy/deleteById
   * @request query integer *id
   * @response 200 Academy 删除成功!
   * @apikey
   */
  async deleteById() {
    const { ctx, service } = this;
    ctx.body = await service.academy.deleteById(ctx.query.id);
  }

  /**
   * @summary 修改学院信息
   * @description 修改学院信息
   * @router put /api/academy/update/{id}
   * @request path integer *id
   * @request body Academy *body
   * @response 200 Academy 修改成功!
   * @apikey
   */
  async updateOne() {
    const { ctx, service } = this;
    ctx.body = await service.academy.update(ctx.params.id, ctx.request.body);
  }

  /**
   * @summary 获取学院信息列表
   * @description 获取学院信息列表
   * @router get /api/academy/findAll
   * @request query integer *page
   * @request query integer *pagesize
   * @response 200 Academy 查询成功
   * @apikey
   */
  async findAll() {
    const { ctx, service } = this;
    ctx.body = await service.academy.getAcademyList(ctx.query.page, parseInt(ctx.query.pagesize));
  }
}

module.exports = AcademyController;
