module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const News = app.model.define('news', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    releaser: STRING,
    release_time: STRING,
    news_title: STRING,
    news_body: STRING,
    views: INTEGER,
    file: STRING
  }, {
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return News;
};