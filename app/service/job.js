'use strict';

const Service = require('egg').Service;

class JobService extends Service {
  /**
   * jobName, academyId, details三个参数插入一条记录
   * @param {*} jobName
   * @param {*} academyId
   * @param {*} details
   */
  async createOne(jobName, academyId, details) {
    const { ctx } = this;
    const res = await ctx.model.Job.findOne({   //判断是否存在重复职业
      where: {
        jobName: jobName
      }
    })
    if (!res) {
      if (details === undefined) {
        res = await ctx.model.Job.create({
          jobName: jobName,
          academyId: academyId
        })
        if (res) {
          return {
            code: 0,
            message: '插入成功！',
            data: res
          }
        } else {
          ctx.throw(404, { code: 1, message: '插入失败！' });
        }
      } else {
        const res = await ctx.model.Job.create({
          jobName: jobName,
          academyId: academyId,
          details: details
        })
        if (res) {
          return {
            code: 0,
            message: '插入成功！',
            data: res
          }
        } else {
          ctx.throw(404, { code: 1, message: '插入失败！' });
        }
      }
    } else {
      ctx.throw(404, { code: 1, message: '存在相同职位！' });
    }
  }

  /**
   * 根据jobId删除一条记录
   * @param {*} jobId 
   */

  async deleteById(jobId) {
    const { ctx } = this;
    const res = await ctx.model.job.findByPk(jobId);
    if (!res) {
      ctx.throw(404, { code: 1, message: "没有此记录！" })
    } else {
      res = await ctx.model.job.destroy({
        where: {
          jobId: jobId
        }
      })
      if (res) {
        return {
          code: 0,
          data: res,
          message: '删除成功!'
        }
      } else {
        return {
          code: 1,
          data: res,
          message: '删除失败'
        }
      }
    }
  }

  /**
   * 根据工作名称删除记录
   * @param {*} jobName 
   */
  async deleteByName(jobName) {
    const { ctx } = this;
    const res = await ctx.model.job.findOne({
      where: {
        jobName: jobName
      }
    });
    if (!res) {
      ctx.throw(404, { code: 1, message: "没有此记录！" })
    } else {
      res = await ctx.model.job.destroy({
        where: {
          jobName: jobName
        }
      })
      if (res) {
        return {
          code: 0,
          data: res,
          message: '删除成功!'
        }
      } else {
        return {
          code: 1,
          data: res,
          message: '删除失败'
        }
      }
    }
  }
}

module.exports = JobService;
