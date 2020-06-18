/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const StudentJobTag = app.model.define('student_job_tag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    job_tag: {
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  }, {
    tableName: 'studentjobtag',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return StudentJobTag;
};
