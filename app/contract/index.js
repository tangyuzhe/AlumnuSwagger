module.exports = {
  //定义用户类型
  User: {
    id: { type: 'number', description: 'id' },
    account: { type: 'string', description: '用户账号' },
    password: { type: 'string', description: '用户密码' },
    student_id: { type: 'string', description: '学号' },
    student_name: { type: 'string', description: '姓名' }
  },
  Auth: {
    account: { type: 'string', description: '用户账号' },
    password: { type: 'string', description: '用户密码' }
  },
  wx: {
    appid: { type: 'string', description: '微信用户APPID', example: 'wx71ad464a92087801' },
    secret: { type: 'string', description: '微信用户SECRET', example: '8aa8cb5b568c2d7f8847ecfae2028662' },
    code: { type: 'string', description: '登录凭证Code', example: '' }
  },
  Alumnus: {
    id: { type: 'number', description: 'id' },
    name: { type: 'string', description: '姓名' },
    student_id: { type: 'string', description: '学号' },
    card_id: { type: 'string', description: '身份证号' },
    sex: { type: 'string', description: '性别' },
    birthday: { type: 'string', description: '出生日期' },
    school: { type: 'string', description: '学校' },
    college: { type: 'string', description: '学院' },
    speciality: { type: 'string', description: '专业' },
    class: { type: 'string', description: '班级' },
    education: { type: 'string', description: '学历' },
    workplace: { type: 'string', description: '工作地点' },
    workunit: { type: 'string', description: '工作单位' },
    post: { type: 'string', description: '职务' },
    phone: { type: 'string', description: '联系方式' }
  }
}