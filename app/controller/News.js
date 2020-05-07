'use strict';

const Controller = require('egg').Controller;
const fs = require("fs")
const pump = require("pump")
/**
 * @controller News
 */
class SchoolNewsController extends Controller {
  /**
   * @summary 上传图片
   * @description 上传图片 更新用户的头像
   * @router post /api/upload
   * @request formData file *file
   * @response 200 baseResponse 更新成功
   */
  async upload() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = [];
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        ctx.throw('请选择上传的图片!')
        return
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await this.service.news.getUploadFile(stream.filename)
      const target = dir.saveDir;
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files.push({
        [fieldname]: target
      })
    }
    ctx.body = {
      code: 0,
      data: files,
      message: "上传成功"
    }
  }

  /**
   * @summary 创建新闻
   * @description 记录新闻
   * @router post /api/news/createNews
   * @request body schoolNews *body 
   * @response 200 schoolNews 创建成功
   */
  async create() {
    const { ctx, service } = this;
    ctx.body = await service.news.createNews(ctx.request.body);
  }

  /**
   * @summary 获取新闻列表
   * @description 获取新闻列表
   * @router get /api/news
   * @response 200 schoolNews 查询成功
   */
  async getList() {
    const { ctx, service } = this;
    ctx.body = await service.news.getNewsList();
  }

  /**
   * @summary 查询新闻
   * @description 获取新闻列表
   * @router get /api/news/{type}
   * @request path integer *type
   * @request query integer *page
   * @request query integer *pagesize
   * @response 200 schoolNews 查询成功
   */
  async findNews() {
    const { ctx, service } = this;
    let page = ctx.query.page;
    let pagesize = parseInt(ctx.query.pagesize)
    ctx.body = await service.news.findNews(ctx.params.type, page, pagesize);
  }
}
module.exports = SchoolNewsController;
