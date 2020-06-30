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
   * @apikey
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
   * @apikey
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
   * @apikey
   */
  async findStudentActivity() {
    const { ctx, service } = this;
    const student_id = ctx.query.student_id;
    const activity_id = ctx.query.activity_id;
    ctx.body = await service.studentactivities.findStudentActivity(student_id, activity_id)
  }

  /**
   * @summary 查询学生预约的所有活动
   * @description 获取学生预约的所有活动
   * @router get /api/studentactivity/findAllstudentactivity
   * @request query string *student_id
   * @response 200 StuActivity 查询成功
   * @apikey
   */
  async findAllStudentActivity() {
    const { ctx, service } = this;
    const student_id = ctx.query.student_id;
    ctx.body = await service.studentactivities.findAllStudentActivities(student_id)
  }

  /**
   * @summary 修改学生活动
   * @description 签到功能、提交报告、提交报告分数
   * @router put /api/studentactivity/updatestudentactivity
   * @request query integer *id
   * @request query string signed_time
   * @request query string report
   * @request query integer report_score
   * @response 200 StuActivity 修改成功
   * @apikey
   */
  async UpdateStudentActivity() {
    const { ctx, service } = this;
    const id = ctx.query.id;
    const signed_time = ctx.query.signed_time;
    const report = ctx.query.report;
    const report_score = parseInt(ctx.query.report_score);
    ctx.body = await service.studentactivities.updateStudentActivity(id, signed_time, report, report_score)
  }

  /**
     * @summary 获取某活动所有学生
     * @description 获取某活动所有学生
     * @router get /api/stuactivity/allstudent
     * @request query integer *activity_id
     * @request query integer *page
     * @request query integer *pagesize
     * @response 200 StuActivity 获取成功
     * @apikey
     */
  async findAllStudents() {
    const { ctx, service } = this;
    const activity_id = ctx.query.activity_id;
    const page = ctx.query.page;
    const pagesize = parseInt(ctx.query.pagesize);
    ctx.body = await service.studentactivities.findAllStudents(activity_id, page, pagesize)
  }
}
module.exports = StudentActivitiesController;
