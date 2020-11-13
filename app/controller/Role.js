'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Role 
 */
class RoleController extends Controller {
  /**
   * @summary 查询角色
   * @description 获取用户角色
   * @router get /api/userRole
   * @request query string *openid
   * @response 200 Role 查询成功
   */
  async getUserRole() {
    const { ctx, service } = this;
    ctx.body = await service.role.getUserRole(ctx.query.openid)
  }

  /**
   * @summary 绑定微信openid
   * @description 绑定微信openid
   * @router put /api/userRole
   * @request query string *userid
   * @request query string *openid
   * @response 200 Role 修改成功 
   */
  async updateOpenid() {
    const { ctx, service } = this;
    ctx.body = await service.role.updateOpenid(ctx.query.userid, ctx.query.openid)
  }

  /**
   * @summary 解绑微信openid
   * @description 解绑微信openid
   * @router put /api/unbundUserRole
   * @request query string *userid
   * @response 200 Role 解绑成功
   */
  async unbundOpenid() {
    const { ctx, service } = this;
    ctx.body = await service.role.unbundOpenid(ctx.query.userid);
  }
}
module.exports = RoleController;
