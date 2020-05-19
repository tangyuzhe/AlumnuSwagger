/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    student_id: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    student_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'user',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });
  return User;
};
