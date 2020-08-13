'use strict';

const Controller = require('egg').Controller;
/**
 * @controller Academy
 */
class AcademyController extends Controller {
  /**
   * @summary 新建学院记录
   * @description 新建一条学院记录
   * @router post /api/academy/create
   * @request body Academy *body 
   * @response 200 Academy 创建成功
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.academy.createOne(data);
  }

  /**
   * @summary 删除学院记录
   * @description 根据学院名称删除学院记录
   * @router delete /api/academy/delete
   * @request query string *name
   * @response 200 Academy 删除成功
   * @apikey
   */
  async delete() {
    const { ctx, service } = this;
    const name = ctx.query.name;
    ctx.body = await service.academy.delete(name)
  }
}

module.exports = AcademyController;
