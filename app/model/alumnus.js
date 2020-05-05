module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Alumnus = app.model.define('alumnu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    student_id: STRING(10),
    card_id: STRING(18),
    sex: STRING,
    birthday: STRING,
    school: STRING,
    college: STRING,
    speciality: STRING,
    class: STRING,
    education: STRING,
    workplace: STRING,
    workunit: STRING,
    post: STRING,
    phone: STRING(11)
  }, {
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return Alumnus;
};