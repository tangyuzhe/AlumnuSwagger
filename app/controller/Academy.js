'use strict';

const Controller = require('egg').Controller;
/**
 * @controller Academy
 */
class AcademyController extends Controller {
  /**
   * @summary 新增加学院信息
   * @description 新曾一条学院信息
   * @router post /api/academy/create
   * @request body Academy *body 
   * @response 200 Academy 增加成功！
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.academy.createOne(data);
  }

  /**
   * @summary 根据学院名称删除学院记录
   * @description 根据学院名称删除学院记录
   * @router delete /api/academy/deleteByName
   * @request query string *name
   * @response 200 Academy 删除成功!
   * @apikey
   */
  async deleteByName() {
    const { ctx, service } = this;
    const name = ctx.query.name;
    ctx.body = await service.academy.deleteByName(name);
  }

  /**
   * @summary 根据学院id删除学院记录
   * @description 根据学院id删除学院记录
   * @router delete /api/academy/deleteById
   * @request query integer *id
   * @response 200 Academy 删除成功!
   * @apikey
   */
  async deleteById() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    ctx.body = await service.academy.deleteById(id);
  }

  /**
   * @summary 根据学院代码删除学院记录
   * @description 根据学院number删除学院记录
   * @router delete /api/academy/deleteByNumber
   * @request query string *number
   * @response 200 Academy 删除成功!
   * @apikey
   */
  async deleteByNumber() {
    const { ctx, service } = this;
    const number = ctx.query.number;
    ctx.body = await service.academy.deleteByNumber(number);
  }

  /**
   * @summary 修改学院信息
   * @description 修改学院信息
   * @router put /api/academy/update/{id}
   * @request path integer *id
   * @request body Academy *body
   * @response 200 Academy 修改成功
   * @apikey
   */
  async updateOne() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    ctx.body = await service.academy.update(id, data);
  }
}

module.exports = AcademyController;
