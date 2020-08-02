import instance from '@src/api/http';

export const getUserList = (params = {}) => instance({
  url: '/user/list',
  method: 'get',
  params,
});
export const postAddUser = (data = {}) => instance({
  url: '/user/list',
  method: 'post',
  data,
});
export const postDeleteUser = (data = {}) => instance({
  url: '/user/list',
  method: 'post',
  data,
});
export const getUserDetail = (params = {}) => instance({
  url: '/user/detail',
  method: 'get',
  params,
});
export const putEditeUser = (data = {}) => instance({
  url: '/user/detail',
  method: 'put',
  data,
});
export const getUserPermissions = (params = {}) => instance({
  url: '/user/permissions',
  method: 'get',
  params,
});
export const getLogout = (params = {}) => instance({
  url: '/user/logout',
  method: 'get',
  params,
});
export const postChangePassword = (data = {}) => instance({
  url: '/user/change',
  method: 'post',
  data,
});
