/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Comment = app.model.define('news', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    tableName: 'comment',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return Comment;
};
