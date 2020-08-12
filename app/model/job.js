/* indent size: 2 */
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;

  const Job = app.model.define('job', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    jobname: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    academy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'academy',
        key: 'id',
      },
    },
    details: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'job',
  });

  Job.associate = function() {
  };
  return Job;
};
