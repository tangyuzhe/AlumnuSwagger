'use strict';

const Controller = require('egg').Controller;
/**
 * @controller Credits
 */
class CreditsController extends Controller {
 /**
   * @summary 查询学分绩
   * @description 根据学号查询学分绩记录
   * @router get /api/credits/findCredits
   * @request query string *sno
   * @response 200 Credits 增加成功！
   * @apikey
   */
  async findCredits() {
    const { ctx, service } = this;
    ctx.body = await service.credits.findCredits(ctx.query.sno);
  }
}

module.exports = CreditsController;
