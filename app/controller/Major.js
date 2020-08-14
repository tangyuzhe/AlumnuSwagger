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
   * @summary 根据专业名称删除专业记录
   * @description 根据专业名称删除专业记录
   * @router delete /api/major/deleteByName
   * @request query string *name
   * @response 200 Major 删除成功
   * @apikey
   */
  async deleteByName() {
    const { ctx, service } = this;
    const name = ctx.query.name;
    ctx.body = await service.major.deleteByName(name)
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
   * @summary 根据学院id删除专业记录
   * @description 根据学院id删除专业记录
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
}

module.exports = MajorController;