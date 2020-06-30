module.exports = app => {
  const { router, controller, jwt } = app;
  const alumnu = app.controller.alumnus
  router.post('/api/alumnus/createAlumnu', jwt, alumnu.createAlumnu)
  router.get('/api/alumnus/findAlumnu', jwt, alumnu.findAlumnu)
  router.delete('/api/alumnus/:id', jwt, alumnu.deleteAlumnu)
  router.put('/api/alumnus', jwt, alumnu.updateAlumnu)
  router.get('/api/alumnus', jwt, alumnu.findAll)
};