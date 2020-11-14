'use strict';
const { Service } = require('egg');
class ActionTokenService extends Service {
  async apply(userid, openid) {
    const token = this.ctx.app.jwt.sign({ userid, openid }, this.ctx.app.config.jwt.secret, { expiresIn: '7d' })
    return token;
  }
}

module.exports = ActionTokenService;
