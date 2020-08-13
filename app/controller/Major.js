'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Major
 */
class MajorController extends Controller {
  /**
   * @summary 新建专业信息
   * @description 新建一条专业信息
   * @router post /api/major/create
   * @request body Major *body
   * @response 200 Major 创建成功
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.major.createOne(data);
  }
}

module.exports = MajorController;