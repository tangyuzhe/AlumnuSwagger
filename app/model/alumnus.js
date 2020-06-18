/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Alumnus = app.model.define('alumnu', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    student_id: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    card_id: {
      type: DataTypes.STRING(18),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    college: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    speciality: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    education: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workunit: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    student_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employment_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'alumnu',
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return Alumnus;
};
