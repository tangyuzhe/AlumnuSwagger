'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class RoleService extends Service {
  /**
   * 查询角色表
   * @param {*} openid 
   */
  async getUserRole(openid,userid) {
    const { ctx } = this;
    const query = {};
    if(openid){
      query.openid = openid;
    }
    if(userid){
      query.userid = userid;
    }
    const res = await ctx.model.Role.findOne({
      where: query
    })
    if (!res) {
      ctx.throw(404, { code: 1, message: "查无此数据" })
    } else {
      return {
        code: 0,
        message: "查询成功",
        data: res
      }
    }
  }

  async updateOpenid(userid, openid) {
    const { ctx } = this;
    const mark = await ctx.model.Role.findOne({
      where: {
        userid: userid
      }
    })
    if (!mark) {
      ctx.throw(404, { code: 1, message: "查无此数据" })
    } else {
      const res = await ctx.model.Role.update({
        openid: openid
      }, {
        where: {
          userid: userid
        }
      })
      if (res == 0) {
        ctx.throw(404, { code: 1, message: "修改失败" })
      } else {
        return {
          code: 0,
          message: "修改成功"
        }
      }
    }    
  }

  /**
   * 解绑微信openid
   * @param {string} userid 
   */
  async unbundOpenid(userid) {
    const { ctx } = this;
    const mark = await ctx.model.Role.findOne({
      where: {
        userid: userid
      }
    })
    if (!mark) {
      ctx.throw(404, { code: 1, message: "查无此数据" })
    } else {
      const res =await ctx.model.Role.update({
        openid: null
        },{ 
        where:{
          userid:userid
        }
      })
      if(res){
        return{
          code: 0,
          message: "解绑成功"
        }
      }
      else{
        return{
          code: 1,
          message: "解绑失败"
        }
      }
    }
  }


  async StatusOfBindOpenid(){
    const { ctx } = this;
    const bind = await ctx.model.Role.findAndCountAll({
      where:{
        openid:{ [Op.ne]: null }
      }
    });
    const unbind = await ctx.model.Role.findAndCountAll({
      where:{
        openid:null
      }
    });
    return {
      "绑定的人数":bind.count,
      "未绑定的人数":unbind.count
    }
  }

  async findAll(current,size){
    const res = await this.ctx.model.Role.findAndCountAll({
      offset:(current-1)*size,
      limit:size
    });
    return res;
  }

  
  async create(role){
    const res = await this.ctx.model.Role.create(role);
    return res;
  }
}

module.exports = RoleService;
