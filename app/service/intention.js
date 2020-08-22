'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class IntentionService extends Service {
    /**
   * 创建问卷
   * @param {*} intention 
   */
  async createIntention(intention) {
    const { ctx } = this;
    const res = await ctx.model.Intention.create(intention)
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }

  /**
   * 修改问卷
   * @param {*} intention 
   */
  async updateIntention(intention) {
    const { ctx } = this;
    const res = await ctx.model.Intention.update(intention,{
      where:{
        id:intention.id
      }
    })
    if(res!=0){
      return{
        code: 0,
        message: '更新成功'
     }
    }
    else{
      return{
        code: 1,
        message: '更新失败'
     }
    }
  }

   /**
   * 根据学号查询问卷
   * @param {*} id 
   */
  async queryBySno(sno){
      const {ctx} = this;
     const res = await ctx.model.Intention.findAll({
         where:{
             sno:sno
         }
     });
     if(res.length==0){
        return{
            code:1,
            message: '查询失败'
        }
     }
     else{
        return{
            code: 0,
            message: '查询成功',
            data: res
         }
     }
  }


  /**
   * 根据问卷id删除问卷
   * @param {*} id 
   */
async removeIntention(id){
  const {ctx} = this;
  const res = await ctx.model.Intention.destroy({
    where:{
      id:id
    }
  })
  if(res!=0){
    return{
      code: 0,
      message: '删除成功'
   }
  }
  else{
    return{
      code: 1,
      message: '删除失败'
   }
  }
}

 /**
   * 查询问卷
   * @param {*} queryForm 
   */
  async queryByForm(queryForm){
    const {ctx} = this;
    let where = {[Op.or]:[{ sno: { [Op.like]: '%' +  '%' }}]};
    let order = [];
        if ((queryForm.keyword != ''&&queryForm.keyword!=null)) {
            where = {
                [Op.or]: [{ sno: { [Op.like]: '%' + queryForm.keyword + '%' }}, 
                    { sname: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { intentionality_city1: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { intentionality_city2: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { intentionality_city3: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { phone: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { qq: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { skill: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { location: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { company: { [Op.like]: '%' + queryForm.keyword + '%' } },
                    { failedCourses: { [Op.like]: '%' + queryForm.keyword + '%' } }],
            };}
            if(queryForm.academyId!=''&&queryForm.academyId!=null){
              where.academy_id = queryForm.academyId
            };
            if(queryForm.educationBackground!=''&&queryForm.educationBackground!=null){
              where.education_background = queryForm.educationBackground
            };
            if(queryForm.majorId!=''&&queryForm.majorId!=null){
              where.major_id = queryForm.majorId
            };
            var array = Object.getOwnPropertySymbols(where);
            if(queryForm.intentionalityCity!=''&&queryForm.intentionalityCity!=null){
              where[array[0]].push({ intentionality_city1: { [Op.like]: '%' + queryForm.intentionalityCity + '%' }})
              where[array[0]].push({ intentionality_city2: { [Op.like]: '%' + queryForm.intentionalityCity + '%' }})
              where[array[0]].push({ intentionality_city3: { [Op.like]: '%' + queryForm.intentionalityCity + '%' }})
            };
            if(queryForm.intentionalityJob!=''&&queryForm.intentionalityJob!=null){
              where[array[0]].push({ intentionality_job1: queryForm.intentionalityJob})
              where[array[0]].push({ intentionality_job2: queryForm.intentionalityJob})
              where[array[0]].push({ intentionality_job3: queryForm.intentionalityJob})
            };
            if(queryForm.sort===0){
              order.push(['created_at','DESC'])
            }else if(queryForm.sort===1){
              order.push(['created_at'])
            }
            if(queryForm.mixSalary==''||queryForm.mixSalary==null){
              queryForm.mixSalary = 0
            }
            if(queryForm.maxSalary==''||queryForm.maxSalary==null){
              queryForm.maxSalary = 100000000
            }
            where.salary = {
                [Op.and]:[
                  {[Op.gte]: queryForm.mixSalary},
                  {[Op.lte]: queryForm.maxSalary},
                ]
            }
            if(queryForm.page==''||queryForm.page==null){
              queryForm.page = 1
            }
            if(queryForm.pageSize==''||queryForm.pageSize==null){
              queryForm.pageSize = 10
            }
            console.log(where)
            const start = (queryForm.page - 1) * queryForm.pageSize;
            const res = await ctx.model.Intention.findAndCountAll({
                 where,
                 order,
                 offset: start,
                 limit: Number(queryForm.pageSize)
                })
                return{
                  code: 0,
                  message: '查询成功',
                  data: res
                 }
  }

  /**
   * 获取意向统计
   */
  async getIntention(){
    const {ctx} = this;
    const res = await ctx.model.Intention.findAll({
      attributes:['employmentOrientation', [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
      group: 'employmentOrientation',
      raw:true
    });
    return {
      code: 0,
      message: '查询成功！',
      date: res
    }
  }
}
module.exports = IntentionService;
