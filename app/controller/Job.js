'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Job
 */
class JobController extends Controller {
 /**
   * @summary 新增职业信息
   * @description 新增一条职业信息
   * @router post /api/job/create
   * @request body Job *body 
   * @response 200 Job 增加成功！
   * @apikey
   */
  async createOne() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.job.create(data);
  }

  /**
   * @summary 根据职业名称删除职业记录
   * @description 根据职业名称删除职业记录
   * @router delete /api/job/deleteByName
   * @request query string *name
   * @response 200 Job 删除成功!
   * @apikey
   */
  async deleteByName() {
    const { ctx, service } = this;
    const name = ctx.query.name;
    ctx.body = await service.job.deleteByName(name);
  }

  /**
   * @summary 根据职业id删除职业记录
   * @description 根据职业id删除职业记录
   * @router delete /api/job/deleteById
   * @request query integer *id
   * @response 200 Job 删除成功!
   * @apikey
   */
  async deleteById() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    ctx.body = await service.job.deleteById(id);
  }

  /**
   * @summary 根据学院id删除职业记录
   * @description 根据学院iid删除职业记录
   * @router delete /api/job/deleteByAcademy
   * @request query integer *academy
   * @response 200 Job 删除成功!
   * @apikey
   */
  async deleteByAcademy() {
    const { ctx, service } = this;
    const academy = ctx.query.academy;
    ctx.body = await service.job.deleteByAcademy(academy);
  }

  /**
   * @summary 修改职业信息
   * @description 修改职业信息
   * @router put /api/job/update/{id}
   * @request path integer *id
   * @request body Job *body
   * @response 200 Job 修改成功
   * @apikey
   */
  async updateOne() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    ctx.body = await service.job.update(id, data);
  }
}

module.exports = JobController;
