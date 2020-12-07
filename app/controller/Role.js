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
   * @request query string openid
   * @request query string userid
   * @response 200 Role 查询成功
   */
  async getUserRole() {
    const { ctx, service } = this;
    ctx.body = await service.role.getUserRole(ctx.query.openid,ctx.query.userid);
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

  /**
   * @summary 绑定人数统计
   * @description 绑定人数统计
   * @router get /api/Bindstatistics
   * @response 200 Role 获取数据统计
   */
  async StatusOfBindOpenid() {
    const { ctx, service } = this;
    ctx.body = await service.role.StatusOfBindOpenid();
  }

  /**
   * @summary 学生绑定分页查询
   * @description 学生绑定分页查询
   * @router get /api/bindPagination
   * @request query integer *currentPage
   * @request query integer *pageSize
   * @response 200 Role 分页查询
   */
  async findAll() {
    const { ctx, service } = this;
    ctx.body = await service.role.findAll(Number(ctx.query.currentPage),Number(ctx.query.pageSize));
  }

  /**
   * @summary 角色信息添加
   * @description 角色信息添加
   * @router post /api/createRole
   * @request body Role *body
   * 
   */
  async create(){
    const { ctx, service } = this;
    ctx.body = await service.role.create(ctx.request.body);
  }
}
module.exports = RoleController;
