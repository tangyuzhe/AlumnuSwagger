'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class StudentActivitiesService extends Service {
  /**
   * 添加活动信息
   *  @param {*} payload 
   */
  async create(payload) {
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.create(payload);
    return {
      code: 0,
      data: res,
      message: "添加成功"
    }
  }

  /**
   * 根据学号和活动编号删除数据
   * @param {*} student_id 
   * @param {*} activity_id 
   */
  async delStudentActivity(student_id, activity_id) {
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.destroy({
      where: {
        student_id: student_id,
        activity_id: activity_id
      }
    });
    if (res <= 0) {
      ctx.throw(400, { code: 1, message: '没有数据可删除' })
    } else {
      return {
        code: 0,
        data: res,
        message: "成功删除" + res + "条数据"
      }
    }
  }

  /**
   * 查询学生报名的活动
   * @param {*} student_id 
   * @param {*} activity_id 
   */
  async findStudentActivity(student_id, activity_id) {
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.findAll({
      where: {
        student_id: student_id,
        activity_id: activity_id
      }
    });
    if (res.length == 0) {
      ctx.throw(400, { code: 1, message: "查询失败" })
    } else {
      return {
        code: 0,
        data: res,
        message: "查询成功"
      }
    }
  }

  /**
   * 查询学生报名的所有活动
   * @param {*} student_id 
   */
  async findAllStudentActivities(student_id) {
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.findAll({
      where: {
        student_id: student_id
      }
    });
    if (res.length == 0) {
      ctx.throw(400, { code: 1, message: "查询失败" })
    } else {
      return {
        code: 0,
        data: res,
        message: "查询成功"
      }
    }
  }

  /**
   * 
   * @param {*} id 
   * @param {*} signed
   * @param {*} report
   * @param {*} report_score
   */
  async updateStudentActivity(id, signed, report, report_score) {
    const { ctx } = this;
    const data = await ctx.model.StudentActivities.findByPk(id);
    if (!data) {
      ctx.throw(404, { code: 1, message: "未查询到该活动" })
    } else {
      const res = await ctx.model.StudentActivities.update({
        signed: signed,
        report: report,
        report_score: report_score
      }, { where: { id: id } })
      return {
        code: 0,
        data: res,
        message: "修改成功"
      }
    }
  }

  /**
   * 查询某活动所有参与的学生
   * @param {*} activity_id 
   * @param {*} page 
   * @param {*} pagesize 
   */
  async findAllStudents(activity_id, page, pagesize) {
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.findAndCountAll({
      offset: (page - 1) * pagesize,
      limit: pagesize,
      where: {
        activity_id: activity_id
      }
    })
    return res
  }

  /**
   * 统计签到人数
   * @param {*} activity_id 
   */
  async CountSignNumber(activity_id) {
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.findAndCountAll({
      where: {
        activity_id: activity_id,
        signed: { [Op.ne]: null }
      }
    })
    return {
      msg: '到场签到人数',
      data: res.count
    };
  }

  /**
   * 学生扫码签到
   */
  async StudentSign(stuid,activity_id,signed){
    const { ctx } = this;
    const res = await ctx.model.StudentActivities.update({
      signed: signed,
    }, {
      where: { 
         student_id:stuid,
         activity_id:activity_id
      }
    })
    return {
      code: 0,
      data: res,
      message: "修改成功"
    }
  }
}


module.exports = StudentActivitiesService;
