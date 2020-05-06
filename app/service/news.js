'use strict';
const Service = require('egg').Service;
const path = require("path");
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');
class SchoolNewsService extends Service {
  /**
   * 上传文件
   * @param {*} filename 
   */
  async getUploadFile(filename) {
    let day = sd.format(new Date(), 'YYYYMMDD');
    let dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir);
    let date = Date.now();
    let uploadDir = path.join(dir, date + path.extname(filename));
    return {
      uploadDir,
      saveDir: this.ctx.origin + uploadDir.replace(/\\/g, '/')
    }
  }

  /**
   * 添加新闻信息
   * @param {*} payload 
   */
  async createNews(payload) {
    const { ctx } = this;
    const res = await ctx.model.News.create(payload);
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }


  async getNewsList() {
    const { ctx } = this;
    const res = await ctx.model.News.findAndCountAll();
    if (!res) {
      ctx.throw(404, { code: 1, message: "无数据" })
    } else {
      return {
        code: 0,
        data: res.rows,
        total: res.count,
        message: "查询成功"
      }
    }
  }

}

module.exports = SchoolNewsService;
