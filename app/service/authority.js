"use strict";
const Service = require("egg").Service;
const qs = require("qs");

class AuthorityService extends Service {
  async weixinLogin() {
    const { ctx } = this;
    const Codedata = ctx.query;
    const params = {
      appid: this.app.config.weixin.appID,
      secret: this.app.config.weixin.appsecret,
      code: Codedata.code,
      grant_type: "authorization_code",
    };
    const res_token = await ctx.curl(
      "https://api.weixin.qq.com/sns/oauth2/access_token?" +
        qs.stringify(params)
    );
    var tokenData = JSON.parse(res_token.data.toString());
    const userInfoParams = {
      access_token: tokenData.access_token,
      openid: tokenData.openid,
      lang: "zh_CN",
    };
    const res = await ctx.curl(
      "https://api.weixin.qq.com/sns/userinfo?" + qs.stringify(userInfoParams)
    );
    const userInfo = JSON.parse(res.data.toString());
    return {
      statusCode: 0,
      msg: "成功获取用户信息",
      data: { userinfo: userInfo, token: tokenData },
    };
  }
}
module.exports = AuthorityService;
