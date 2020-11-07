'use strict';

const Controller = require('egg').Controller;
const qs = require("qs")
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
 * @request query string *name 
 * @response 200 baseResponse 获取成功
 */
  async getToken() {
    const { ctx, service } = this;
    ctx.body = await service.user.getToken(ctx.query.userid, ctx.query.name)
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
   * @summary 微信公众号授权
   * @description 授权获取code后进行API请求
   * @router get /api/user/WXCode
   * @request query string *code
   * @response 200 baseResponse 获取成功
   */
  async getWXAuth() {
    const { ctx, service } = this;
    ctx.body = await service.user.getWXAuth(ctx.query.code)
    ctx.redirect("http://thesecondclass.linaxhua.cn:8080/#/pages/wxLogin/index?" + qs.stringify(ctx.body));
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
    ctx.redirect("http://thesecondclass.linaxhua.cn:8081/#/pages/index/index?" + qs.stringify(ctx.body));
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
    ctx.body = await service.user.getInfo(ctx.query.access_token, ctx.query.openid)
  }

  /**
   * @summary 平安灵川获取token
   * @description 平安灵川获取token
   * @router get /api/peacelc/token
   * @response 200 baseResponse 获取成功
   */
  async GetPeaceLCToken() {
    const { ctx, service } = this;
    ctx.body = await service.user.GetPeaceLCToken()
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
    ctx.body = await service.user.GetPeaceLCUserInfo(ctx.query.access_token, ctx.query.openid)
  }


    /**
   * @summary V2智慧校园学生信息绑定
   * @description V2智慧校园学生信息绑定
   * @router get /api/guet/YQAuth
   * @request query string *ticket
   */
  async SmartCampusIdentityAuthentication(){
    const {ctx,service} = this;
    const data  = await service.user.SmartCampusIdentityAuthentication(ctx.query.ticket);
    if(data){
      ctx.redirect('http://yq.guet.edu.cn:8080/html5?'+qs.stringify(data))
    }else{
      ctx.redirect('http://yq.guet.edu.cn:8080/html5')
    }
  }
}
module.exports = UserController;
