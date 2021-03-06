/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const News = app.model.define('news', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    releaser: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    release_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    news_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    news_body: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    file: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'news',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return News;
};
