module.exports = app => {
  const { router, controller, jwt } = app;
  const activity = app.controller.activity
  router.post('/api/activity/createActivity', jwt, activity.create)
  router.put('/api/activity/updateActivity', jwt, activity.update)
  router.get('/api/activities', jwt, activity.findAll)
  router.get('/api/activity', jwt, activity.findOne)
  router.delete('/api/activity/:id', jwt, activity.delete)
  router.put('/api/activity/update/:id', jwt, activity.updateOne)
};