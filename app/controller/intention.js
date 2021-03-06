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
   * @router post /api/Intention/updateIntention
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
   * 年级grade[例如：18] 学院编码academyNum[例如：001-015] 专业 major[例如：软件工程，详细参考major表,输入0为统计全院]
   * 标志mark[0表示为意向城市，1表示为签约城市统计，输入1意向次序参数失效]
   * 意向次序order[1-第意向，2-第二意向，3-第三意向]
   * @router get /api/Intention/city
   * @request query integer *grade
   * @request query string *academyNum
   * @request query string *major
   * @request query integer *mark
   * @request query integer *order
   * @apikey
   */
  async getCity(){
    const { ctx, service } = this;
    ctx.body = await service.intention.getCity(ctx.query.grade, ctx.query.academyNum, ctx.query.major, ctx.query.mark, ctx.query.order);
  }

  /**
   * @summary 职业分类统计
   * @description 需要参数：
   * 年级grade[例如：18] 学院编码academyNum[例如：001-015] 专业 major[例如：软件工程，详细参考major表,输入0为统计全院]
   * 标志mark[0表示为意向职业，1表示为签约职业统计，输入1意向次序参数失效]
   * 意向次序order[1-第意向，2-第二意向，3-第三意向]
   * @router get /api/Intention/job
   * @request query integer *grade
   * @request query string *academyNum
   * @request query string *major
   * @request query integer *mark
   * @request query integer *order
   * @apikey
   */
  async getJob(){
    const { ctx, service } = this;
    ctx.body = await service.intention.getJob(ctx.query.grade, ctx.query.academyNum, ctx.query.major, ctx.query.mark, ctx.query.order);
  }

  /**
   * @summary 统计学院指定年级各专业期望或者所得平均薪资
   * @description 统计学院指定年级各专业期望或者所得平均薪资,status=1,则统计已签约平均薪资；status=0，则统计意愿平均薪资
   * @router get /api/Intention/salary
   * @request query integer *grade
   * @request query string *academyNum
   * @request query integer *status
   * @apikey
   */
  async getSalary(){
    const { ctx, service } = this;
    ctx.body = await service.intention.getSalary(ctx.query.grade, ctx.query.academyNum, ctx.query.status);
  }

  /**
   * @summary 统计人数
   * @description 返回指定学院年级填意向表的总人数、拟考研人数、拟就业人数、已就业人数、已考研人数（status为1为确定，0为意向，根据这个来筛选四个信息的）
   * //如果要统计整个年级的，学院输入0即可，否则输入学院按专业统计
   * @router get /api/Intention/Statistics
   * @request query integer *grade
   * @request query string *academyNum
   * @request query string *major
   * @apikey
   */
  async getStatistics(){
    const { ctx, service } = this;
    ctx.body = await service.intention.getStatistics(ctx.query.grade, ctx.query.academyNum, ctx.query.major);
  }

  /**
   *@summary 获取最新更新时间
   *@description 获取最新的更新时间
   *@router get /api/Intention/getTime
   *@apikey 
   */
  async getTime(){
    const { ctx, service } = this;
    ctx.body = await service.intention.getTime();
  }

  /**
   * @summary 根据status筛选
   * @description 筛选
   * @router get /api/Intention/findByStatue
   * @request query integer *status
   * @apikey
   */
  async findByStaus(){
    const { ctx, service } = this;
    ctx.body = await service.intention.findByStatus(ctx.query.status);

  }

  /**
   * @summary 城市、职业筛选接口
   * @description 筛选出第一志愿，第二志愿，第三志愿的某个职业和某个城市的学号和姓名,其中academy、major、grade不输入默认统计全部
   * status=0意向，status=1就业 学院、专业输入为中文名称 sign=1第一意向城市 sign=2第二意向城市 sign=3第三意向城市 
   * sign=4第一意向职业 sign=5第二意向职业 sign=6第三意向职业
   * @router get /api/Intention/CityFind
   * @request query integer *status
   * @request query string *academy
   * @request query string *major
   * @request query integer *grade
   * @request query integer *sign
   * @request query string *keyword
   * @apikey
   */
  async CityFind(){
    const { ctx, service } = this;
    ctx.body = await service.intention.CityFind(ctx.query.status, ctx.query.academy, ctx.query.major, ctx.query.grade, ctx.query.sign, ctx.query.keyword);
  }
}



module.exports = IntentionController;
