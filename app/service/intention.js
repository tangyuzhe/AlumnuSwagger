'use strict';

const Service = require('egg').Service;
let Excel = require('exceljs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class IntentionService extends Service {
  /**
   * 创建问卷
   * @param {object} intention
   */
  async createIntention(intention) {
    const { ctx } = this;
    const res = await ctx.model.Intention.create(intention);
    return {
      code: 0,
      message: '添加成功',
      data: res,
    };
  }

  /**
   * 修改问卷
   * @param {object} intention
   */
  async updateIntention(intention) {
    const { ctx } = this;
    const res = await ctx.model.Intention.update(intention, {
      where: {
        id: intention.id,
      },
    });
    if (res != 0) {
      return {
        code: 0,
        message: '更新成功',
      };
    }
    return {
      code: 1,
      message: '更新失败',
    };

  }

  /**
   * 根据学号查询问卷
   * @param {integer} id
   */
  async queryBySno(sno) {
    const { ctx } = this;
    const res = await ctx.model.Intention.findAll({
      where: {
        sno: sno,
      },
    });
    if (res.length == 0) {
      return {
        code: 1,
        message: '查询失败',
      };
    }
    const credit = await ctx.model.Credits.findAll({
      where: {
        sno: sno
      }
    });

    const resume = await ctx.model.Resume.findAll({
      where: {
        sno: sno
      }
    });
    return {
      code: 0,
      message: '查询成功',
      data: res,
      credit: credit,
      resume: resume
    };

  }


  /**
   * 根据问卷id删除问卷
   * @param {integer} id
   */
  async removeIntention(id) {
    const { ctx } = this;
    const res = await ctx.model.Intention.destroy({
      where: {
        id: id,
      },
    });
    if (res != 0) {
      return {
        code: 0,
        message: '删除成功',
      };
    }

    return {
      code: 1,
      message: '删除失败',
    };

  }

  /**
   * 查询问卷
   * @param {object} queryForm
   */
  async queryByForm(queryForm) {
    const { ctx } = this;
    let where = { [Op.or]: [{ sno: { [Op.like]: '%' + '%' } }] };
    let order = [];
    if ((queryForm.keyword != '' && queryForm.keyword != null)) {
      where = {
        [Op.or]: [{ sno: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { sname: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { intentionality_city1: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { intentionality_city2: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { intentionality_city3: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { phone: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { qq: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { skill: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { location: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { company: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { failedCourses: { [Op.like]: '%' + queryForm.keyword + '%' } }],
      };
    }
    if (queryForm.academy != '' && queryForm.academy != null) {
      where.academy = queryForm.academy;
    }
    if (queryForm.educationBackground != '' && queryForm.educationBackground != null) {
      where.education_background = queryForm.educationBackground;
    }
    if (queryForm.major != '' && queryForm.major != null) {
      where.major = queryForm.major;
    }
    let array = Object.getOwnPropertySymbols(where);
    if (queryForm.intentionalityCity != '' && queryForm.intentionalityCity != null) {
      where[array[0]].push({ intentionality_city1: { [Op.like]: '%' + queryForm.intentionalityCity + '%' } });
      where[array[0]].push({ intentionality_city2: { [Op.like]: '%' + queryForm.intentionalityCity + '%' } });
      where[array[0]].push({ intentionality_city3: { [Op.like]: '%' + queryForm.intentionalityCity + '%' } });
    }
    if (queryForm.intentionalityJob != '' && queryForm.intentionalityJob != null) {
      where[array[0]].push({ intentionality_job1: { [Op.like]: '%' + queryForm.intentionalityJob + '%' } });
      where[array[0]].push({ intentionality_job2: { [Op.like]: '%' + queryForm.intentionalityJob + '%' } });
      where[array[0]].push({ intentionality_job3: { [Op.like]: '%' + queryForm.intentionalityJob + '%' } });
    }
    if (queryForm.sort === 0) {
      order.push(['created_at', 'DESC']);
    } else if (queryForm.sort === 1) {
      order.push(['created_at']);
    }
    if (queryForm.mixSalary == '' || queryForm.mixSalary == null) {
      queryForm.mixSalary = 0;
    }
    if (queryForm.maxSalary == '' || queryForm.maxSalary == null) {
      queryForm.maxSalary = 9999999999;
    }
    where.salary = {
      [Op.and]: [
        { [Op.gte]: queryForm.mixSalary },
        { [Op.lte]: queryForm.maxSalary },
      ],
    };
    if (queryForm.page == '' || queryForm.page == null) {
      queryForm.page = 1;
    }
    if (queryForm.pageSize == '' || queryForm.pageSize == null) {
      queryForm.pageSize = 10;
    }
    console.log(where);
    const start = (queryForm.page - 1) * queryForm.pageSize;
    const res = await ctx.model.Intention.findAndCountAll({
      where,
      order,
      offset: start,
      limit: Number(queryForm.pageSize),
    });
    return {
      code: 0,
      message: '查询成功',
      data: res,
    };
  }

  /**
   * 获取意向统计
   */
  async getIntention() {
    const { ctx } = this;
    const res = await ctx.model.Intention.findAll({
      attributes: ['employmentOrientation', [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      group: 'employmentOrientation',
      raw: true,
    });
    return {
      code: 0,
      message: '统计成功！',
      data: res,
    };
  }

  /**
   * 查询问卷
   * @param {object} queryForm
   */
  async queryDownloadData(queryForm) {
    const { ctx } = this;
    let where = { [Op.or]: [{ sno: { [Op.like]: '%' + '%' } }] };
    let order = [];
    if ((queryForm.keyword != '' && queryForm.keyword != null)) {
      where = {
        [Op.or]: [{ sno: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { sname: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { intentionality_city1: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { intentionality_city2: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { intentionality_city3: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { phone: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { qq: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { skill: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { location: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { company: { [Op.like]: '%' + queryForm.keyword + '%' } },
          { failedCourses: { [Op.like]: '%' + queryForm.keyword + '%' } }],
      };
    }
    if (queryForm.academy != '' && queryForm.academy != null) {
      where.academy = queryForm.academy;
    }
    if (queryForm.educationBackground != '' && queryForm.educationBackground != null) {
      where.education_background = queryForm.educationBackground;
    }
    if (queryForm.major != '' && queryForm.major != null) {
      where.major = queryForm.major;
    }
    let array = Object.getOwnPropertySymbols(where);
    if (queryForm.intentionalityCity != '' && queryForm.intentionalityCity != null) {
      where[array[0]].push({ intentionality_city1: { [Op.like]: '%' + queryForm.intentionalityCity + '%' } });
      where[array[0]].push({ intentionality_city2: { [Op.like]: '%' + queryForm.intentionalityCity + '%' } });
      where[array[0]].push({ intentionality_city3: { [Op.like]: '%' + queryForm.intentionalityCity + '%' } });
    }
    if (queryForm.intentionalityJob != '' && queryForm.intentionalityJob != null) {
      where[array[0]].push({ intentionality_job1: { [Op.like]: '%' + queryForm.intentionalityJob + '%' } });
      where[array[0]].push({ intentionality_job2: { [Op.like]: '%' + queryForm.intentionalityJob + '%' } });
      where[array[0]].push({ intentionality_job3: { [Op.like]: '%' + queryForm.intentionalityJob + '%' } });
    }
    if (queryForm.sort === 0) {
      order.push(['created_at', 'DESC']);
    } else if (queryForm.sort === 1) {
      order.push(['created_at']);
    }
    if (queryForm.mixSalary == '' || queryForm.mixSalary == null) {
      queryForm.mixSalary = 0;
    }
    if (queryForm.maxSalary == '' || queryForm.maxSalary == null) {
      queryForm.maxSalary = 100000000;
    }
    where.salary = {
      [Op.and]: [
        { [Op.gte]: queryForm.mixSalary },
        { [Op.lte]: queryForm.maxSalary },
      ],
    };
    const res = await ctx.model.Intention.findAndCountAll({
      where,
      order,
    });
    return {
      code: 0,
      message: '查询成功',
      data: res,
    };
  }

  /**
   * 获取意向统计
   */
  async download(data, filename) {
    const { ctx } = this;
    const Academy = await ctx.model.Academy.findAll();
    const Major = await ctx.model.Major.findAll();
    let workbook = new Excel.Workbook();
    let sheet = workbook.addWorksheet('sheet');
    sheet.columns = [
      { header: '学号', key: 'sno', width: 15 },
      { header: '姓名', key: 'sname', width: 15 },
      { header: '学院', key: 'academy', width: 15 },
      { header: '学历', key: 'educationBackground', width: 15 },
      { header: '专业', key: 'major', width: 15 },
      { header: '当前状态', key: 'status', width: 15 },
      { header: '意向', key: 'employmentOrientation', width: 15 },
      { header: '意向城市1', key: 'intentionalityCity1', width: 15 },
      { header: '意向城市2', key: 'intentionalityCity2', width: 15 },
      { header: '意向城市3', key: 'intentionalityCity3', width: 15 },
      { header: '意向职业1', key: 'intentionalityJob1', width: 15 },
      { header: '意向职业1', key: 'intentionalityJob2', width: 15 },
      { header: '意向职业1', key: 'intentionalityJob3', width: 15 },
      { header: '手机号码', key: 'phone', width: 15 },
      { header: 'qq', key: 'qq', width: 15 },
      { header: '具备技能', key: 'skill', width: 15 },
      { header: '就业地址', key: 'location', width: 15 },
      { header: '公司名称', key: 'company', width: 15 },
      { header: '薪资', key: 'salary', width: 15 },
      { header: '欠修学分课程', key: 'failedCourses', width: 15 },
    ];
    for (let item of data.data.rows) {
      for (let A of Academy) {
        if (A.id === item.academy) { item.academy = A.name; }
      }
      for (let M of Major) {
        if (M.id === item.major) {
          item.major = M.name;
        }
      }
      if (item.educationBackground === 0) {
        item.educationBackground = '本科生';
      } else if (item.educationBackground === 1) {
        item.educationBackground = '研究生';
      }
      if (item.status === 0) {
        item.status = '待业中';
      } else if (item.status === 1) {
        item.status = '已就业';
      }
    }
    sheet.addRows(data.data.rows);
    ctx.response.attachment(filename+ '.xlsx');
    ctx.status = 200;
    await workbook.xlsx.write(ctx.res);
    ctx.res.end();
  }

  /**
   * 城市分类统计
   * @param {integer} grade 
   * @param {string} academyNum 
   * @param {string} major
   * @param {integer} mark 
   * @param {integer} order 
   */
  async getCity(grade, academyNum, major, mark, order){
    const {ctx} = this;
    let res;
    if (major == 0) {
      if (mark == 1) {
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionalityCity1', [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          status: mark },
          group: 'intentionalityCity1',
          raw: true,
          })
      } else if(mark == 0){
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionalityCity' + order , [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          status: mark },
          group: 'intentionalityCity' + order,
          raw: true,
        })
      }
    } else {
      if (mark == 1) {
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionalityCity1', [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          major: major,
          status: mark },
          group: 'intentionalityCity1',
          raw: true,
        })
      } else if(mark == 0){
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionalityCity' + order , [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          major: major,
          status: mark },
          group: 'intentionalityCity' + order,
          raw: true,
        })
      }
    }
    return {
      code: 0,
      message: '统计成功！',
      count: res.length,
      data: res
    }
  }

  /**
   * 职业分类统计
   * @param {integer} grade 
   * @param {string} academyNum 
   * @param {string} major
   * @param {integer} mark 
   * @param {integer} order 
   */
  async getJob(grade, academyNum, major, mark, order){
    const {ctx} = this;
    let res;
    if (major == 0) {
      if (mark == 1) {
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionality_job1', [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          status: mark },
          group: 'intentionality_job1',
          raw: true,
          })
      } else if(mark == 0){
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionality_job' + order , [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          status: mark },
          group: 'intentionality_job' + order,
          raw: true,
        })
      }
    } else {
      if (mark == 1) {
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionality_job1', [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          major: major,
          status: mark },
          group: 'intentionality_job1',
          raw: true,
        })
      } else if(mark == 0){
        res = await ctx.model.Intention.findAll({
          attributes: [ 'intentionality_job' + order , [Sequelize.fn('COUNT',Sequelize.col('*')),'count']],
          where: {
          sno: {[Op.like]: grade + academyNum + '%'},
          major: major,
          status: mark },
          group: 'intentionality_job' + order,
          raw: true,
        })
      }
    }
    return {
      code: 0,
      message: '统计成功！',
      count: res.length,
      data: res
    }
  }

  /**
   * 
   * @param {integer} grade 
   * @param {string} academyNum 
   * @param {integer} status 
   */
  async getSalary(grade, academyNum, status){
    const {ctx} = this;
    const res = await ctx.model.Intention.findAll({
      attributes: [ 'majorId', [Sequelize.fn('AVG',Sequelize.col('salary')),'AVG']],
      where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: status
      },
      group: 'majorId',
      raw: true,
      // include: [{
      //   model: this.app.model.Major,
      //   as: 'basic',
      //   required: 'majorId',
      //   where: {
      //     id: majorId
      //   }
      // }]
    })
    return {
      code: 0,
      message: '统计成功！',
      count: res.length,
      data: res
    }
  }

  /**
   * 
   * @param {integer} grade 
   * @param {string} academyNum 
   * @param {string} major
   */
  async getStatistics(grade, academyNum, major){
    const {ctx} = this;
    let res =new Array(5);
    let res1,res2,res3,res4,res5;
    if (major == 0) {
      res1 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'填写意愿总人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 0
        }
      })
      res2 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'拟考研人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 0,
        employmentOrientation: '考研'
        }
      })
      res3 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'拟就业人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 0,
        employmentOrientation: '就业'
        }
      })
  
      res4 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'已考研人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 1,
        employmentOrientation: '考研'
        }
      })
      res5 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'已就业人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 1,
        employmentOrientation: '就业'
        }
      })
    } else {
      res1 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'填写意愿总人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 0,
        major: major
        }
      })
      res2 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'拟考研人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 0,
        employmentOrientation: '考研',
        major: major
        }
      })
      res3 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'拟就业人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 0,
        employmentOrientation: '就业',
        major: major
        }
      })
  
      res4 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'已考研人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 1,
        employmentOrientation: '考研',
        major: major
        }
      })
      res5 = await ctx.model.Intention.findAll({
        attributes: [[Sequelize.fn('COUNT',Sequelize.col('*')),'已就业人数']],
        where: {
        sno: {[Op.like]: grade + academyNum + '%'},
        status: 1,
        employmentOrientation: '就业',
        major: major
        }
      })
    }
    
    return {
      code: 0,
      message: '统计成功！',
      res1,
      res2,
      res3,
      res4,
      res5
    }
  }

  /**
   * 获取最新更细时间
   */
  async getTime(){
    const {ctx} = this;
    const time = JSON.stringify(await ctx.model.Intention.findAll({
      attributes:[[Sequelize.fn('Max',Sequelize.col('updated_at')),'time']]
    }));
    return {
      code: 0,
      message: '查找成功',
      time: time,
      year: time.substring(10,14),
      month: time.substring(15,17),
      date: time.substring(18,20)
    }
  }
  
  async findByStatus(status){
    const {ctx} = this;
    const res = await ctx.model.Intention.findAll({
      where: {
        status: status
      }
    })

    return {
      code: 0,
      count: res.length,
      message: '查找成功',
      data: res
    }
  }
/**
 * @param {integer} status
 * @param {string} academy 
 * @param {string} major 
 * @param {integer} grade 
 * @param {integer} sign 
 * @param {string} keyword 
 */
  async CityFind(status, academy, major, grade, sign, keyword){
    const {ctx} = this;
    let data;
    if (status == 0) {    //意愿
      if (academy == 0) {   //学院无限制
        if (major == 0) {   //专业无限制
          if (grade == 0) {   //年级无限制
            switch(sign){   //查找内容
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
            }
          } else {    //年级限制
            switch(sign){
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
            }
          }
        } else {    //专业限制
          if (grade == 0) {   //年级无限制
            switch(sign){   //查找内容
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
            }
          } else {    //年级限制
            switch(sign){
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
            }
          }
        }
      } else {    //学院限制
        if (major == 0) {   //专业无限制
          if (grade == 0) {   //年级无限制
            switch(sign){   //查找内容
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
            }
          } else {    //年级限制
            switch(sign){
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
            }
          }
        } else {    //专业限制
          if (grade == 0) {   //年级无限制
            switch(sign){   //查找内容
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
            }
          } else {    //年级限制
            switch(sign){
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    academy: academy,
                    major: major,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
            }
          }
        }
      }
    } else { 既定
      if (academy == 0) {   //学院无限制
        if (major == 0) {   //专业无限制
          if (grade == 0) {   //年级无限制
            switch(sign){   //查找内容
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    status: 1
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
            }
          } else {    //年级限制
            switch(sign){
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
            }
          }
        } else {    //专业限制
          if (grade == 0) {   //年级无限制
            switch(sign){   //查找内容
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    status: 0
                  }
                })
              }break;
            }
          } else {    //年级限制
            switch(sign){
              case '1':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '2':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '3':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '4':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '5':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
              case '6':{
                data = await ctx.model.Intention.findAll({
                  attributes: ['sno', 'sname'],
                  where: {
                    major: major,
                    intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                    sno: {[Op.like]: grade + '%' },
                    status: 0
                  }
                })
              }break;
            }
          }
        }
      } else {    //学院限制
        if (major == 0) {   //专业无限制
            if (grade == 0) {   //年级无限制
              switch(sign){   //查找内容
                case '1':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '2':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '3':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '4':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '5':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '6':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
              }
            } else {    //年级限制
              switch(sign){
                case '1':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '2':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '3':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '4':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '5':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '6':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
              }
            }
          } else {    //专业限制
            if (grade == 0) {   //年级无限制
              switch(sign){   //查找内容
                case '1':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '2':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '3':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '4':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '5':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
                case '6':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                      status: 1
                    }
                  })
                }break;
              }
            } else {    //年级限制
              switch(sign){
                case '1':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityCity1: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '2':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityCity2: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '3':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityCity3: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '4':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityJob1: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '5':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityJob2: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
                case '6':{
                  data = await ctx.model.Intention.findAll({
                    attributes: ['sno', 'sname'],
                    where: {
                      academy: academy,
                      major: major,
                      intentionalityJob3: {[Op.like]: '%' + keyword + '%'},
                      sno: {[Op.like]: grade + '%' },
                      status: 1
                    }
                  })
                }break;
              }
            }
          }
      }
    }
    return {
      code: 0,
      count: data.length,
      message: '查找成功',
      data: data
    }
  }
}

module.exports = IntentionService;
