'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Auth
 */
class UserController extends Controller {

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /api/user/createUser
   * @request body User *body
   * @response 200 baseResponse 创建成功
   */
  async createUser() {
    const { ctx, service } = this;
    // 校验参数
    // ctx.validate(ctx.rule.createUserRequest);
    let user = ctx.request.body;
    ctx.body = await service.user.createUser(user);
  }

  /**
   * @summary Auth测试获取token
   * @description 用户测试获取token
   * @router post /api/user/Auth
   * @request body Auth *body
   * @response 200 baseResponse 获取成功
   */
  async getToken() {
    const { ctx, service } = this;
    ctx.body = await service.user.getToken(ctx.request.body)
  }

  /**
   * @summary 微信授权
   * @description 微信登录获取凭证code
   * @router put /api/user/wxAuth
   * @request query string *student_id
   * @request query string *openid
   * @response 200 baseResponse 修改成功
   */
  async WXAccess() {
    const { ctx, service } = this;
    ctx.body = await service.user.updateOpenid(ctx.query.student_id, ctx.query.openid)
  }

  /**
   * @summary 查询到用户信息
   * @description 查询到用户信息
   * @router get /api/user
   * @request query string *account
   * @response 200 baseResponse 获取成功
   */
  async findUser() {
    const { ctx, service } = this;
    ctx.body = await service.user.findUserInfo(ctx.query.account)
  }

  /**
   * @summary 修改密码
   * @description 修改密码
   * @router put /api/user
   * @request query string *password
   * @request query string *student_id
   * @response 200 baseResponse 修改成功
   */
  async updatePassword() {
    const { ctx, service } = this;
    ctx.body = await service.user.updatePassword(ctx.query.password, ctx.query.student_id)
  }
}
module.exports = UserController;
