'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller Job
 */
class JobController extends Controller {
  /**  
    * @summary 插入记录
    * @description 根据jobName, academyId, details插入一条记录
    * @router post /v1/controllers/student/create
    * @request query string *jobName 职位名称
    * @request query integer *academyId 所属学院Id
    * @request query string *details 详细描述
    * @response 200 job 返回对象
    * @apikey
    */
  async create() {
    const { ctx, service } = this;
    const jobId = ctx.query.jobId;
    const jobName = ctx.query.jobName;
    const academyId = ctx.query.academyId;
    const details = ctx.query.details;
    const date = await service.job.createOne(jobName, academyId, details);
    ctx.body = date;
  }
}

module.exports = JobController;
