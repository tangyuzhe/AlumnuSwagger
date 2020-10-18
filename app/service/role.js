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
}

module.exports = RoleService;
