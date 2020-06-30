module.exports = app => {
  require('./router/activity')(app);
  require('./router/alumnus')(app);
  require('./router/message')(app);
  require('./router/news')(app);
  require('./router/studentActivities')(app);
  require('./router/studentjobtags')(app);
};
