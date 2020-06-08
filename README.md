#项目下载 git clone https://github.com/tangyuzhe/AlumnuSwagger.git
#packages安装  npm install
#项目运行 npm run dev
#数据库Mysql配置 在app>config>config.default.js
  config.sequelize = {
    dialect: 'mysql', //数据库类型
    database: 'guet', //数据库名称  
    host: 'localhost',  
    port: 3306, //端口
    username: 'root', //数据库用户名
    password: '191514', //数据库密码
  };

#数据的CRUD sequelize
1、app下model文件定义数据模型
2、app下的service定义sequelize方法（create，findAll，update和destroy)
3、app下的controller定义swagger接口及service的使用
4、app下的contract定义swagger的数据模型

