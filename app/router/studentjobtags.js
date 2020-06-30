module.exports = app => {
  const { router, controller, jwt } = app;
  const studentjobtags = app.controller.studentJobTag
  router.post('/api/jobtag/createJobTag', jwt, studentjobtags.createJobTag)
  router.get('/api/jobtags', jwt, studentjobtags.findTags)
  router.delete('/api/jobtags/:id', jwt, studentjobtags.deleteTag)
};