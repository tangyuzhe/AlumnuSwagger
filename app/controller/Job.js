'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Job
 */
class JobController extends Controller {
 /**
   * @summary 创建工作信息
   * @description 新建一条工作信息
   * @router post /api/job/create
   * @request body Job *body 
   * @response 200 Job 创建成功
   * @apikey
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.job.createOne(data);
  }

  /**
   * @summary 删除职业记录
   * @description 根据职业名称删除职业记录
   * @router delete /api/job/delete
   * @request query string *name
   * @response 200 Job 删除成功
   * @apikey
   */
  async delete() {
    const { ctx, service } = this;
    const name = ctx.query.name;
    ctx.body = await service.job.delete(name)
  }
}

module.exports = JobController;
