'use strict';
const { Service } = require('egg');
class ActionTokenService extends Service {
  async apply(username, password) {
    const token = this.ctx.app.jwt.sign({ username, password }, this.ctx.app.config.jwt.secret, { expiresIn: '24h' })
    return token;
  }
}

module.exports = ActionTokenService;
