'use strict';

const Controller = require('egg').Controller;

/**
 * @controller StudentActivities
 */
class StudentActivitiesController extends Controller {
  /**
   * @summary 学生预约活动
   * @description 新建一条学生预约的活动
   * @router post /api/studentactivity/create
   * @request body StuActivity *body 
   * @response 200 StuActivity 创建成功
   */
  async create() {
    const { ctx, service } = this;
    let data = ctx.request.body;
    ctx.body = await service.studentactivities.create(ctx.request.body)
  }

  /**
   * @summary 取消学生预约的活动
   * @description 取消学生预约的活动
   * @router delete /api/studentactivity
   * @request query string *student_id
   * @request query integer *activity_id
   * @response 200 StuActivity 查询成功
   */
  async delStudentActivity() {
    const { ctx, service } = this;
    const student_id = ctx.query.student_id;
    const activity_id = ctx.query.activity_id;
    ctx.body = await service.studentactivities.delStudentActivity(student_id, activity_id)
  }

  /**
   * @summary 查询学生预约的活动
   * @description 获取学生预约的活动
   * @router get /api/studentactivity/findstudentactivity
   * @request query string *student_id
   * @request query integer *activity_id
   * @response 200 StuActivity 查询成功
   */
  async findStudentActivity() {
    const { ctx, service } = this;
    const student_id = ctx.query.student_id;
    const activity_id = ctx.query.activity_id;
    ctx.body = await service.studentactivities.findStudentActivity(student_id, activity_id)
  }
}
module.exports = StudentActivitiesController;
