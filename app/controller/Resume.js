'use strict';

const Controller = require('egg').Controller;
/**
 * @controller Resume
 */
class ResumeController extends Controller {
 /**
   * @summary 查询投简历记录
   * @description 根据学号查询投简历记录
   * @router get /api/resume/findResume
   * @request query string *sno
   * @response 200 Resume 查询成功！
   * @apikey
   */
  async findResume() {
    const { ctx, service } = this;
    ctx.body = await service.resume.findResume(ctx.query.sno);
  }
  /**
   * @summary 插入投简历记录
   * @description 插入一条投简历记录
   * @router post /api/resume/creat
   * @request body Resume *body
   * @response 200 Resume 增加成功！
   * @apikey
   */
  async create(){
    const { ctx, service } = this;
    ctx.body = await service.resume.create(ctx.request.body);
  }
}

module.exports = ResumeController;
