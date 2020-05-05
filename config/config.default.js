'use strict';

module.exports = appInfo => {
  const config = {};
  config.baseUrl = '/api';
  // should change to your own
  config.keys = appInfo.name + '_1490750627161_5967';
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'GUET Alumnus API',
      description: '校友信息接口',
      version: 'v1',
    },
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'clientkey',
        in: 'header',
      },
    },
    schemes: ['http', 'https'],
    enable: true,
    routerMap: true,
  };

  // 配置上传文件白名单
  config.multipart = {
    fileExtensions: ['.pdf', '.txt', '.png', '.jpg'],
  };

  //Mysql配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'guet',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '191514',
  };

  //bcrypt 密码加密
  config.bcrypt = {
    saltRounds: 10
  };

  //jwt token密令
  config.jwt = {
    secret: "123456"
  }

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '192.168.0.104',

    }
  }
  return config;
};

