'use strict';

const Controller = require('egg').Controller;
/**
 * @controller Academy
 */
class AcademyController extends Controller {
  /**
   * @summary 新建学院信息
   * @description 新建一条学院信息
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
}

module.exports = AcademyController;
