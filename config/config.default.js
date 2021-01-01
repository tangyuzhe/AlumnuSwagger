"use strict";

module.exports = (appInfo) => {
  const config = {};
  config.baseUrl = "/api";
  config.uploadDir = "/app/public/upload";
  // should change to your own
  config.keys = appInfo.name + "_1490750627161_5967";

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  config.weixin = {
    appID: "wx3508ae3ee71e9f68",
    appsecret: "0bbec777652406507af7c0516d82dbb1",
  };

  config.swaggerdoc = {
    dirScanner: "./app/controller",
    apiInfo: {
      title: "GUET Alumnus API",
      description: "校友信息接口",
      version: "v1",
    },
    securityDefinitions: {
      apikey: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    schemes: ["http", "https"],
    enableSecurity: true,
    routerMap: true,
  };

  // 配置上传文件白名单
  config.multipart = {
    fileExtensions: [".pdf", ".txt", ".png", ".jpg", ".xlsx"],
    fileSize: "50mb", // 文件大小
    mode: "stream", // 必须写;千万别写错
    whitelist: [".xlsx"], // 文件类型白名单;报400错;一般就是你没写这句话;允许接收解析该类型文件;
  };

  // Mysql配置
  config.sequelize = {
    dialect: "mysql",
    database: "guet",
    host: "124.70.188.227",
    port: 3306,
    username: "root",
    password: "Fznfzn509.",
    timezone: "+08:00",
  };

  // bcrypt 密码加密
  config.bcrypt = {
    saltRounds: 10,
  };

  // jwt token密令
  config.jwt = {
    secret: "123456",
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: "127.0.0.1",
    },
  };

  config.session = {
    renew: true,
    maxAge: 24 * 3600 * 1000,
  };

  return config;
};
