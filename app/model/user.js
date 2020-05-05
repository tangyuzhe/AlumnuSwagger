module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    account: STRING(30),
    password: STRING(50),
    student_id: STRING(11),
    student_name: STRING
  }, {
    timestamps: false,      //去除createAt updateAt
    freezeTableName: true
  });

  return User;
};