/* indent size: 2 */
module.exports = app => {
  const DataTypes = app.Sequelize;
  const Job = app.model.define('job', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING(20),
          allowNull: false,
      },
      academy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'academy',
            key: 'id',
          },
      },
      details: {
          type: DataTypes.STRING(1024),
          allowNull: true,
      },
  }, {
      tableName: 'job',
      timestamps: true,
      freezeTableName: true
  });
  return Job;
};