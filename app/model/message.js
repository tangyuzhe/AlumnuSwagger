/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Message = app.model.define('message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    student_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    read_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    read_time: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    tableName: 'message',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return Message;
};
