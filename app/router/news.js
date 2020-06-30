module.exports = app => {
  const { router, controller, jwt } = app;
  const news = app.controller.news
  router.post('/api/news/createNews', jwt, news.create)
  router.get('/api/news', jwt, news.getList)
  router.get('/api/news/:type', jwt, news.findNews)
  router.get('/api/new/:id', jwt, news.findOneNew)
};