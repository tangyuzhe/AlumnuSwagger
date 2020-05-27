/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    theme: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    introduction: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    current_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    finished: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    credit: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'activity',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });
  return Activity;
};
