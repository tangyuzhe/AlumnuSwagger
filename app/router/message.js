module.exports = app => {
  const { router, controller, jwt } = app;
  const message = app.controller.message
  router.post('/api/message/createMessage', jwt, message.createMessage)
  router.get('/api/messages', jwt, message.findMessages)
  router.put('/api/message/:id', jwt, message.UpdateMessage)
  router.delete('/api/message/:id', jwt, message.deleteMessage)
  router.get('/api/messages/newsId', jwt, message.findMessagesById)
};