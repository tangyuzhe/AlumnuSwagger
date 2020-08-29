'use strict';

const Controller = require('egg').Controller;

/**
 * @controller Intention
 */
class IntentionController extends Controller {

  /**
   * @summary 创建就业问卷
   * @description 记录毕业生就业情况
   * @router post /api/Intention/createIntention
   * @request body intention *body
   * @response 200 intention 创建成功
   * @apikey
   */
  async createIntention() {
    const { ctx, service } = this;
    ctx.body = await service.intention.createIntention(ctx.request.body);
  }

  /**
   * @summary 更新就业问卷
   * @description 记录毕业生就业情况
   * @router put /api/Intention/updateIntention
   * @request body intention *body
   * @response 200 intention 更新成功
   * @apikey
   */
  async updateIntention() {
    const { ctx, service } = this;
    ctx.body = await service.intention.updateIntention(ctx.request.body);
  }


  /**
   * @summary 根据学号查询问卷
   * @description 查询问卷记录
   * @router get /api/Intention/queryBySno
   * @request query string *sno
   * @response 200 intention 查询成功
   * @apikey
   */
  async queryIntention() {
    const { ctx, service } = this;
    ctx.body = await service.intention.queryBySno(ctx.query.sno);
  }

  /**
   * @summary 删除问卷
   * @description 删除问卷
   * @router delete /api/Intention/{id}
   * @request path integer *id
   * @response 200 intention 删除成功
   * @apikey
   */
  async removeIntention() {
    const { ctx, service } = this;
    ctx.body = await service.intention.removeIntention(ctx.params.id);
  }

  /**
   * @summary 查询就业问卷
   * @description 根据传入的表单分页查询就业表
   * @router put /api/Intention/query
   * @request body queryForm *body
   * @response 200 queryForm 查询成功
   * @apikey
   */
  async query() {
    const { ctx, service } = this;
    ctx.body = await service.intention.queryByForm(ctx.request.body);
  }

  /**
   * @summary 根据就业意向分类
   * @description 根据就业意向列出每个意向的人数
   * @router get /api/Intention/intention
   * @response 200 intenCensus 查询成功
   * @apikey
   */
  async getIntention() {
    const { ctx, service } = this;
    ctx.body = await service.intention.getIntention();
  }


  /**
   * @summary 下载表格
   * @description 下载表格
   * @router post /api/Intention/download
   * @request body queryForm *body
   */

  async download() {
    const { ctx, service } = this;
    const data = await service.intention.queryDownloadData(ctx.request.body);
    ctx.body = await service.intention.download(data,ctx.request.body.filename);
  }
  
  /**
   * @summary 城市分类统计
   * @description 需要参数：
   * 年级grade[例如：18] 学院编码academyNum[例如：001-015] 专业id majorId[例如：1，详细参考major表id,输入0为统计全院]
   * 标志mark[0表示为意向城市，1表示为签约城市统计，输入1意向次序参数失效]
   * 意向次序order[1-第意向，2-第二意向，3-第三意向]
   * @router get /api/Intention/city
   * @request query integer *grade
   * @request query string *academyNum
   * @request query integer *majorId
   * @request query integer *mark
   * @request query integer *order
   * @response 200 City 查询成功
   * @apikey
   */
  async getCity(){
    const { ctx, service } = this;
    ctx.body = await service.intention.getCity(ctx.query.grade, ctx.query.academyNum, ctx.query.majorId, ctx.query.mark, ctx.query.order);
  }
}

module.exports = IntentionController;
