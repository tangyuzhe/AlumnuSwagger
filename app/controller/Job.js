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
    ctx.body = await service.job.createOne(ctx.request.body);
  }

  /**
   * @summary 根据id删除职业记录
   * @description 根据id删除职业记录
   * @router delete /api/job/deleteById
   * @request query integer *id
   * @response 200 Job 删除成功!
   * @apikey
   */
  async deleteById() {
    const { ctx, service } = this;
    ctx.body = await service.job.deleteById(ctx.query.id);
  }

  /**
   * @summary 根据学院id批量删除职业记录
   * @description 根据学院id批量删除职业记录
   * @router delete /api/job/deleteByAcademy
   * @request query integer *academy
   * @response 200 Job 删除成功!
   * @apikey
   */
  async deleteByAcademy() {
    const { ctx, service } = this;
    ctx.body = await service.job.deleteByAcademy(ctx.query.academy);
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
    ctx.body = await service.job.update(ctx.params.id, ctx.request.body);
  }

  /**
   * @summary 获取职位信息列表
   * @description 获取职位信息列表
   * @router get /api/job/findAll
   * @request query integer *page
   * @request query integer *pagesize
   * @response 200 Job 查询成功
   * @apikey
   */
  async findAll() {
    const { ctx, service } = this;
    ctx.body = await service.job.getJobList(ctx.query.page, parseInt(ctx.query.pagesize));
  }

  /**
   * @summary 根据关键字等信息模糊查找职业信息
   * @description 根据关键字等信息模糊查找职业信息
   * @router get /api/job/find
   * @request query string *keyword
   * @response 200 Job 查询成功
   * @apikey
   */
  async find() {
    const { ctx, service } = this;
    ctx.body = await service.job.find(ctx.query.keyword);
  }

  /**
   * @summary 根据学院id获取职业列表
   * @description 根据学院id获取职业列表
   * @router get /api/job/findByAcademy
   * @request query integer *academy
   * @response 200 Job 查询成功
   * @apikey
   */
  async findByAcademy() {
    const { ctx, service } = this;
    ctx.body = await service.job.findByAcademy(ctx.query.academy);
  }
}

module.exports = JobController;
