/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const StudentActivities = app.model.define('student_activities', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    student_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activity_theme: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    registration_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    signed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    report: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    report_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'student_activities',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });
  return StudentActivities;
};
