'use strict';

const Controller = require('egg').Controller;

/**
 * @controller StudentJobTag
 */
class StudentJobTagController extends Controller {
  /**
   * @summary 添加学生职务
   * @description 添加学生职务
   * @router post /api/jobtag/createJobTag
   * @request body StudentJobTag *body 
   * @response 200 StudentJobTag 创建成功
   * @apikey
   */
  async createJobTag() {
    const { ctx, service } = this;
    let tag = ctx.request.body;
    ctx.body = await service.studentjobtag.createTag(tag);
  }

  /**
   * @summary 查询学生职务
   * @description 查询学生职务
   * @router get /api/jobtags
   * @request query string *student_id
   * @response 200 StudentJobTag 创建成功
   * @apikey
   */
  async findTags() {
    const { ctx, service } = this;
    ctx.body = await service.studentjobtag.findTags(ctx.query.student_id);
  }

  /**
   * @summary 删除学生职务
   * @description 删除学生职务
   * @router delete /api/jobtags/{id}
   * @request path integer *id
   * @response 200 StudentJobTag 创建成功
   * @apikey
   */
  async deleteTag() {
    const { ctx, service } = this;
    ctx.body = await service.studentjobtag.deleteTag(ctx.params.id);
  }
}
module.exports = StudentJobTagController;
