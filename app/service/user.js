'use strict';
const Service = require('egg').Service;
// const UUID = require('uuid');
// const fs = require('fs');
// const path = require('path');


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
   * @param {*} user 
   */
  async getToken(user) {
    const { ctx } = this;
    const res = await ctx.model.User.findOne({
      where: {
        account: user.account
      }
    })
    if (!res) {
      ctx.throw(404, { code: 1, message: '未查询到用户' })
    }
    const verifyPsw = await this.ctx.compare(user.password, res.password);
    if (!verifyPsw) {
      this.ctx.throw(403, { code: 1, message: '用户密码错误' });
    }
    return { code: 0, message: '请求成功', token: await ctx.service.token.apply(user.account, user.password) }
  }

  /**
   * 通过微信APPID和APPSECRET获取用户信息
   * @param {*} APPID 
   * @param {*} APPSECRET 
   * @param {*} CODE
   */
  async wxAccess(wx) {
    const { ctx } = this;
    const querystring = "https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=" + wx.appid + "&secret=" + wx.secret + "&js_code=" + wx.code;
    // const querystring = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + wx.appid + "&secret=" + wx.secret;
    const res = await ctx.curl(querystring, {
      dataType: 'json'
    });
    if (!res) {
      ctx.throw(404, { code: 1, message: "用户查询失败" })
    } else {
      return { code: 0, message: "查询成功", data: res.data }
      // const access_token = res.data.access_token
      // const openid = ctx.curl("https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=" + access_token)
      // return openid
    }
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

  async updatePassword(password, student_id) {
    const { ctx } = this;
    password = await ctx.genHash(password)
    const res = await ctx.model.User.update({ password: password }, { where: { student_id: student_id } })
    return {
      code: 0,
      data: res,
      message: "修改成功"
    }
  }
}

module.exports = UserService;
