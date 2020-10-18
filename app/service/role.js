'use strict';
const Service = require('egg').Service;

class RoleService extends Service {
  /**
   * 查询角色表
   * @param {*} userid 
   */
  async getUserRole(userid) {
    const { ctx } = this;
    const res = await ctx.model.Role.findOne({
      where: {
        userid: userid
      }
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
   * @param {string} operateUserid 
   * @param {string} unbundUserid 
   */
  async unbundOpenid(operateUserid,unbundUserid) {
    const { ctx } = this;
    const role =await ctx.model.Role.findOne({
      where:{
        userid:operateUserid
      }
    })
    if (role.role!=0&&role.role!=null&&role.role!='') {
      const mark = await ctx.model.Role.findOne({
        where: {
          userid: unbundUserid
        }
      })
      if (!mark) {
        ctx.throw(404, { code: 1, message: "查无此数据" })
      } else {
        const res = await ctx.model.Role.update({
          openid: null
        }, {
          where: {
            userid: unbundUserid
          }
        })
        if (res == 0) {
          ctx.throw(404, { code: 1, message: "解绑失败" })
        } else {
          return {
            code: 0,
            message: "解绑成功",
          }
        }
      }    
    } else {
      ctx.throw(404, { code: 1, message: "权限不足！" })
    }
  }
}

module.exports = RoleService;
