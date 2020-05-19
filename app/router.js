'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/swagger-ui.html')
  // const baseUrl = app.config.baseUrl;
  // const home = app.controller.home;
  // const group = app.controller.group;
  // const user = app.controller.user;
  // const wxlogin = app.controller.WXlogin;
  // // upload
  // router.post(`${baseUrl}/upload`, user.upload);
  // router.get('/wxlogin', wxlogin.index)

};
