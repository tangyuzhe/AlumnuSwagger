module.exports = app => {
  const { router, controller, jwt } = app;
  const studentactivity = app.controller.studentActivities
  router.post('/api/studentactivity/create', jwt, studentactivity.create)
  router.delete('/api/studentactivity', jwt, studentactivity.delStudentActivity)
  router.get('/api/studentactivity/findstudentactivity', jwt, studentactivity.findStudentActivity)
  router.get('/api/studentactivity/findAllstudentactivity', jwt, studentactivity.findAllStudentActivity)
  router.put('/api/studentactivity/updatestudentactivity', jwt, studentactivity.UpdateStudentActivity)
  router.get('/api/stuactivity/allstudent', jwt, studentactivity.findAllStudents)
};