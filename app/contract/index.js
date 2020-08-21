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
  // wxAuth: {
  //   appid: { type: 'string', description: '微信用户APPID', example: 'wxa684d4611c2c4d3a' },
  //   secret: { type: 'string', description: '微信用户SECRET', example: '29c838945e6ee4804af4e22e1a5900bd' },
  //   code: { type: 'string', description: '登录凭证Code', example: '' }
  // },
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
    finished: { type: 'number', description: '活动状态（0：未结束；1：结束）' },
    credit: { type: 'number', description: '学分' }
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
  },
  Comment: {
    id: { type: 'number', description: 'id' },
    comment: { type: 'string', description: '反馈意见' }
  },
  Role: {
    id: { type: 'number', description: 'id' },
    name: { type: 'string', description: '姓名' },
    userid: { type: 'string', description: '用户账号' },
    openid: { type: 'string', description: '微信openid' },
    role: { type: 'role', description: '角色' }
  },
  StudentJobTag: {
    id: { type: 'number', description: 'id' },
    student_id: { type: 'string', description: '学号' },
    job_tag: { type: 'string', description: '职务标签' },
  },
  Message: {
    id: { type: 'number', description: 'id' },
    news_id: { type: 'number', description: '新闻id' },
    student_id: { type: 'string', description: '学号' },
    read_status: { type: 'number', description: '阅读状态' },
    read_time: { type: 'string', description: '阅读时间' }
  },
  intention:{
    id: {type: 'number',description: 'id'},
    sno: {type: 'string',description: '学号'},
    sname: {type: 'string',description: '姓名'},
    academyId: {type: 'number',description: '学院'},
    educationBackground: {type: 'number',description: '学历'},
    majorId: {type: 'number',description: '专业'},
    status: {type: 'number',description: '就业状态' },
    employmentOrientation: {type:   'string',description: 'id'},
    intentionalityCity1: {type:   'string',description: '意向城市1'},
    intentionalityCity2: {type:   'string',description: '意向城市2'},
    intentionalityCity3: {type:   'string',description: '意向城市3'},
    intentionalityJob1: {type: 'number',description: '意向职位1'},
    intentionalityJob2: {type: 'number',description: '意向职位2'},
    intentionalityJob3: {type: 'number',description: '意向职位3'},
    phone: {type:   'string',description: '手机号码'},
    qq: {type:   'string',description: 'qq'},
    skill: {type:   'string',description: '技能'},
    location: {type:   'string',description: '公司地址'},
    company: {type:   'string',description: '公司名称'},
    salary: {type: "number",description: '薪资'},
    failedCourses: {type:   'string',description: '挂科科目'}
  },
  Job: {
    id: { type: 'number', description: '职位ID' },
    name: { type: 'string', description: '职位名称' },
    academy: { type: 'number', description: '所属学院ID'},
    details: { type: 'string', description: '详细描述' }
  },
  Academy: {
    id: { type: 'number', description: '学院ID' },
    number: { type: 'string', description: '学院代码' },
    name: { type: 'string', description: '学院名称' },
    details: { type: 'string', description: '详细描述' }
  },
  Major: {
    id: { type: 'number', description: '专业ID' },
    mark: { type: 'string', description: '本硕标记' },
    name: { type: 'string', description: '专业名称' },
    academy: { type: 'number', description: '所属学院ID' },
    details: { type: 'string', description: '详细描述' }
  },
  queryForm:{
    keyword:{type:'string',description:'关键词'},
    academyId: {type: 'number',description: '学院'},
    educationBackground: {type: 'number',description: '学历'},
    majorId: {type: 'number',description: '专业'},
    intentionalityCity: {type:   'string',description: '意向城市'},
    intentionalityJob: {type: 'number',description: '意向职位'},
    mixSalary: {type: "number",description: '最小薪资'},
    maxSalary: {type: "number",description: '最大薪资'},
    sort:{type: "number",description: '排序'},
    pageSize:{type: "number",description: '页的大小'},
    page:{type: "number",description: '页数'}
  }
}