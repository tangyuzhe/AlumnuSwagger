"use strict";

const Controller = require("egg").Controller;
const qs = require("qs");
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
   * @request query string *userid
   * @request query string *openid
   * @response 200 baseResponse 获取成功
   */
  async getToken() {
    const { ctx, service } = this;
    ctx.body = await service.user.getToken(ctx.query.userid, ctx.query.openid);
  }

  /**
   * @summary 教师获取token
   * @description 教师获取token
   * @router post /api/user/teacher/Auth
   * @request query string *account
   * @request query string *password
   * @response 200 baseResponse 获取成功
   */
  async getTeacherToken() {
    const { ctx, service } = this;
    ctx.body = await service.user.getTeacherToken(
      ctx.query.account,
      ctx.query.password
    );
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
    ctx.body = await service.user.updateOpenid(
      ctx.query.student_id,
      ctx.query.openid
    );
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
    ctx.body = await service.user.findUserInfo(ctx.query.account);
  }

  /**
   * @summary 微信公众号授权
   * @description 授权获取code后进行API请求
   * @router get /api/user/WXCode
   * @request query string *code
   * @response 200 baseResponse 获取成功
   */
  async getWXAuth() {
    const { ctx, service } = this;
    ctx.body = await service.user.getWXAuth(ctx.query.code);
    ctx.redirect("https://yq.guet.edu.cn/dept3/" + qs.stringify(ctx.body));
  }

  /**
   * @summary 平安灵川微信公众号授权
   * @description 授权获取code后进行API请求
   * @router get /api/user/PeaceLCWXCode
   * @request query string *code
   * @response 200 baseResponse 获取成功
   */
  async getWXAuthPeaceLC() {
    const { ctx, service } = this;
    ctx.body = await service.user.getWXAuthPeaceLC(ctx.query.code);
    ctx.redirect(
      "http://thesecondclass.linaxhua.cn:8081/#/pages/index/index?" +
        qs.stringify(ctx.body)
    );
  }

  /**
   * @summary 用户信息
   * @description 用户信息接口
   * @router get /api/user/WXinfo
   * @request query string *access_token
   * @request query string *openid
   * @response 200 baseResponse 获取成功
   */
  async getWXInfo() {
    const { ctx, service } = this;
    ctx.body = await service.user.getInfo(
      ctx.query.access_token,
      ctx.query.openid
    );
  }

  /**
   * @summary 平安灵川获取token
   * @description 平安灵川获取token
   * @router get /api/peacelc/token
   * @response 200 baseResponse 获取成功
   */
  async GetPeaceLCToken() {
    const { ctx, service } = this;
    ctx.body = await service.user.GetPeaceLCToken();
  }

  /**
   * @summary 平安灵川获取用户信息
   * @description 平安灵川获取用户信息
   * @router get /api/peacelc/userinfo
   * @request query string *access_token
   * @request query string *openid
   * @response 200 baseResponse 获取成功
   */
  async GetPeaceLCUserInfo() {
    const { ctx, service } = this;
    ctx.body = await service.user.GetPeaceLCUserInfo(
      ctx.query.access_token,
      ctx.query.openid
    );
  }

  /**
   * @summary V2智慧校园学生信息绑定
   * @description V2智慧校园学生信息绑定
   * @router get /api/guet/YQAuth
   * @request query string *ticket
   */
  async SmartCampusIdentityAuthentication() {
    const { ctx, service } = this;
    const data = await service.user.SmartCampusIdentityAuthentication(
      ctx.query.ticket
    );
    if (data) {
      ctx.redirect("https://yq.guet.edu.cn/dept3/?" + qs.stringify(data));
    } else {
      ctx.redirect("https://yq.guet.edu.cn/dept3/#/");
    }
  }

  /**
   * @summary 微信授权登录
   * @description 微信授权登录
   * @router get /api/auth/weixinLogin
   *
   */
  async weixinLogin() {
    const { ctx, service } = this;
    ctx.body = await service.authority.weixinLogin();
  }
}
module.exports = UserController;
