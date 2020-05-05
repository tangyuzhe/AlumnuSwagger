'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/swagger-ui.html')
  // const baseUrl = app.config.baseUrl;
  // const home = app.controller.home;
  // const group = app.controller.group;
  // const user = app.controller.user;

  // // upload
  // router.post(`${baseUrl}/upload`, user.upload);


};
