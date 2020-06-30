'use strict';
const Service = require('egg').Service;
// const UUID = require('uuid');
// const fs = require('fs');
// const path = require('path');
const qs = require("qs")

class UserService extends Service {
  /**
   * 创建用户
   * @param {*} user 
   */
  async createUser(user) {
    const { ctx } = this;
    user.password = await ctx.genHash(user.password)
    const res = await ctx.model.User.create(user)
    return {
      code: 0,
      message: '添加成功',
      data: res
    };
  }

  /**
   * 
   * @param {*} userid 
   * @param {*} name 
   */
  async getToken(userid, name) {
    const { ctx } = this;
    const res = await ctx.model.Role.findOne({
      where: {
        userid: userid,
        name: name
      }
    })
    if (!res) {
      ctx.throw(404, { code: 1, message: '未查询到用户' })
    } else {
      return {
        code: 0,
        message: '请求成功',
        token: await ctx.service.token.apply(userid, name)
      }
    }
  }

  /**
   * 更新openid
   * @param {*} student_id 
   * @param {*} openid 
   */
  async updateOpenid(student_id, openid) {
    const { ctx } = this;
    const res = await ctx.model.User.update({ openid: openid }, {
      where: {
        student_id: student_id
      }
    })
    return res
  }


  async findUserInfo(account) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({
      where: {
        account: account
      }
    })
    if (!res) {
      ctx.throw(404, { code: 1, message: "未查询到用户" })
    } else {
      return {
        code: 0,
        data: res,
        message: "查询成功"
      }
    }
  }

  async getWXAuth(code) {
    const { ctx } = this;
    //测试号
    // let obj = {
    //   appid: "wxa684d4611c2c4d3a",
    //   secret: "29c838945e6ee4804af4e22e1a5900bd",
    //   code: code,
    //   grant_type: "authorization_code"
    // }
    //正式
    let obj = {
      appid: "wx3508ae3ee71e9f68",
      secret: "0bbec777652406507af7c0516d82dbb1",
      code: code,
      grant_type: "authorization_code"
    }
    const res = await ctx.curl("https://api.weixin.qq.com/sns/oauth2/access_token?" + qs.stringify(obj))
    return JSON.parse(res.data.toString())
  }

  async getInfo(access_token, openid) {
    const { ctx } = this;
    const res = await ctx.curl("https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid + "&lang=zh_CN")
    return JSON.parse(res.data.toString())
  }
}

module.exports = UserService;
