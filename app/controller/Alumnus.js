'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Alumnus 
 */
class AlumnusController extends Controller {
  /**
   * @summary 创建校友信息
   * @description 记录校友学校、公司基本信息
   * @router post /api/alumnus/createAlumnu
   * @request body Alumnus *body 
   * @response 200 Alumnus 创建成功
   */
  async createAlumnu() {
    const { ctx, service } = this;
    let alumnu = ctx.request.body;
    ctx.body = await service.alumnus.createAlumnu(alumnu);
  }

  /**
   * @summary 查询校友信息
   * @description 查询校友学校、公司基本信息
   * @router get /api/alumnus/findAlumnu
   * @request query string *name
   * @response 200 baseResponse 查询成功
   */
  async findAlumnu() {
    const { ctx, service } = this;
    ctx.body = await service.alumnus.findAlumnu(ctx.query.name)
  }

  /**
   * @summary 删除校友信息
   * @description 删除校友学校、公司基本信息
   * @router delete /api/alumnus/{id}
   * @request path integer *id
   * @response 200 baseResponse 删除成功
   */
  async deleteAlumnu() {
    const { ctx, service } = this;
    ctx.body = await service.alumnus.deleteAlumnu(ctx.params.id)
  }

  /**
   * @summary 更新校友信息
   * @description 修改校友学校、公司基本信息
   * @router put /api/alumnus
   * @request query integer *id
   * @request body Alumnus *body
   * @response 200 baseResponse 修改成功
   */
  async updateAlumnu() {
    const { ctx, service } = this;
    ctx.body = await service.alumnus.updateAlumnu(ctx.query.id, ctx.request.body)
  }


  /**
   * @summary 获得校友信息列表
   * @description 获得校友信息列表
   * @router get /api/alumnus
   * @request query integer *page
   * @request query integer *pagesize
   * @response 200 Alumnus 查询成功
   */
  async findAll() {
    const { ctx, service } = this;
    let page = ctx.query.page
    let pagesize = parseInt(ctx.query.pagesize)
    ctx.body = await service.alumnus.findAll(page, pagesize)
  }
}
module.exports = AlumnusController;
