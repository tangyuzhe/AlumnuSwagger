'use strict';

// had enabled by egg

exports.static = true;

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt',
};

exports.jwt = {
  enable: true,
  package: "egg-jwt"
};

exports.cors = {
  enable: true,
  package: 'egg-cors'
};

exports.cluster = {
  enable: true,
  package: "egg-cluster"
};