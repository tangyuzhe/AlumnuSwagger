'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Major
 */
class MajorController extends Controller {
  /**
   * @summary 新增专业信息
   * @description 新增一条专业信息
   * @router post /api/major/create
   * @request body Major *body
   * @response 200 Major 增加成功！
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.major.createOne(data);
  }

  /**
   * @summary 根据专业id删除专业记录
   * @description 根据专业id删除专业记录
   * @router delete /api/major/deleteById
   * @request query integer *id
   * @response 200 Major 删除成功!
   * @apikey
   */
  async deleteById() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    ctx.body = await service.major.deleteById(id);
  }

  /**
   * @summary 根据学院id批量删除专业记录
   * @description 根据学院id批量删除专业记录
   * @router delete /api/major/deleteByAcademy
   * @request query integer *academy
   * @response 200 Major 删除成功!
   * @apikey
   */
  async deleteByAcademy() {
    const { ctx, service } = this;
    const academy = ctx.query.academy;
    ctx.body = await service.major.deleteByAcademy(academy);
  }

  /**
   * @summary 修改专业信息
   * @description 修改专业信息
   * @router put /api/major/update/{id}
   * @request path integer *id
   * @request body Major *body
   * @response 200 Major 修改成功
   * @apikey
   */
  async updateOne() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    ctx.body = await service.major.update(id, data);
  }

  /**
   * @summary 获取专业信息列表
   * @description 获取专业信息列表
   * @router get /api/major/findAll
   * @request query integer *page
   * @request query integer *pagesize
   * @response 200 Major 查询成功
   * @apikey
   */
  async findAll() {
    const { ctx, service } = this;
    const page = ctx.query.page;
    const pagesize = parseInt(ctx.query.pagesize);
    ctx.body = await service.major.getMajorList(page, pagesize);
  }

  /**
   * @summary 根据本科/硕士获取专业信息列表（输入本科/硕士）
   * @description 根据本科/硕士获取专业信息列表
   * @router get /api/major/findByMark
   * @request query string *mark
   * @response 200 Major 查询成功
   * @apikey
   */
  async findByMark() {
    const { ctx, service } = this;
    const mark = ctx.query.mark;
    ctx.body = await service.major.findByMark(mark);
  }

  /**
   * @summary 根据学院id获取专业信息列表
   * @description 根据学院id获取专业信息列表
   * @router get /api/major/findByAcademy
   * @request query integer *academy
   * @response 200 Academy 查询成功
   * @apikey
   */
  async findByAcademy() {
    const { ctx, service } = this;
    const academy = ctx.query.academy;
    ctx.body = await service.major.findByAcademy(academy);
  }

  /**
   * @summary 根据专业名称关键字模糊查找专业信息
   * @description 根据专业名称关键字模糊查找专业信息
   * @router get /api/major/findByName
   * @request query string *name
   * @response 200 Major 查询成功
   * @apikey
   */
  async findByName() {
    const { ctx, service } = this;
    const name = ctx.query.name;
    ctx.body = await service.major.findByName(name);
  }
}

module.exports = MajorController;