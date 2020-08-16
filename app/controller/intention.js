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
    ctx.body = await service.intention.createIntention(ctx.request.body)
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
    ctx.body = await service.intention.updateIntention(ctx.request.body)
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
    ctx.body = await service.intention.queryBySno(ctx.query.sno)
  }

  /**
   * @summary 删除问卷
   * @description 删除问卷
   * @router delete /api/Intention/{id}
   * @request path integer *id
   * @response 200 intention 删除成功
   * @apikey
   */
async removeIntention(){
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
    ctx.body = await service.intention.queryByForm(ctx.request.body)
  }

}

module.exports = IntentionController;
