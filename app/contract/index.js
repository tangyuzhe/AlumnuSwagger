module.exports = {
  baseResponse: {
    result: { type: 'boolean', required: true },
    errorMessage: { type: 'string' },
  },
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
  },
  schoolNews: {
    id: { type: 'number', description: 'id' },
    type: { type: 'number', description: '新闻类型(0-学校新闻/1-校内公告/2-校友动态)' },
    releaser: { type: 'string', description: '发布人' },
    release_time: { type: 'string', description: '发布时间' },
    news_title: { type: 'string', description: '主题' },
    news_body: { type: 'string', description: '内容' },
    views: { type: 'number', description: '阅读次数' },
    file: { type: 'string', description: "文件地址" }
  },
  Activity: {
    id: { type: 'number', description: '活动id' },
    theme: { type: 'string', description: '活动主题' },
    start_time: { type: 'string', description: '活动开始时间' },
    venue: { type: 'string', description: '活动场地' },
    introduction: { type: 'string', description: '活动简介' },
    deadline: { type: 'string', description: '活动截止时间' },
    remarks: { type: 'string', description: '活动备注' },
    capacity: { type: 'number', description: '活动容量' },
    current_quantity: { type: 'number', description: '当前人数' },
    finished: { type: 'number', description: '活动状态（0：未结束；1：结束）' }
  },
  StuActivity: {
    id: { type: 'number', description: 'id' },
    student_id: { type: 'string', description: '学号' },
    student_name: { type: 'string', description: '姓名' },
    grade: { type: 'number', description: '年级' },
    activity_id: { type: 'number', description: '活动id' },
    activity_theme: { type: 'string', description: '活动主题' },
    registration_time: { type: 'string', description: '报名时间' },
    signed_time: { type: 'string', description: '签到时间' },
    report: { type: 'string', description: '报告内容' },
    report_grade: { type: 'number', description: '报告分数' }
  }

}