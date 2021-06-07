const { response, request } = require('express');

const getUsers = (_req = request, res = response) => {
  res.json({
    msg: 'get API - Controller',
  });
};

const getUser = (_req = request, res = response) => {
  res.json({
    msg: 'get API - Controller',
  });
};

const postUser = (_req = request, res = response) => {
  res.json({
    msg: 'post API - Controller',
  });
};
const putUser = (_req = request, res = response) => {
  res.json({
    msg: 'put API - Controller',
  });
};
const deleteUser = (_req = request, res = response) => {
  res.json({
    msg: 'delete API - Controller',
  });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
