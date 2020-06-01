/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Role = app.model.define('news', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'role',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return Role;
};
