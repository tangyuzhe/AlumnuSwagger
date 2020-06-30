'use strict';
const { Service } = require('egg');
class ActionTokenService extends Service {
  async apply(userid, name) {
    const token = this.ctx.app.jwt.sign({ userid, name }, this.ctx.app.config.jwt.secret, { expiresIn: '0.25h' })
    return token;
  }
}

module.exports = ActionTokenService;
