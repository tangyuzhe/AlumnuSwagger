'use strict';

const Service = require('egg').Service;

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

}



module.exports = IntentionService;
