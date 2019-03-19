import fetch from 'utils/fetch';

export function loginByEmail(username, password) {
  const data = {
    username,
    password
  };
  return fetch({
    url: '/web/auth/login',
    method: 'post',
    data
  });
}

export function logout(token) {
  return fetch({
    url: '/web/auth/loginout',
    method: 'post',
    params: { token }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/web/user/info',
    method: 'get',
    params: { token }
  });
}

export function getMenus(token) {
  return fetch({
    url: '/web/menu/getByToken',
    method: 'get',
    params: { token }
  });
}

export function getAllMenus() {
  return fetch({
    url: '/web/menu/all',
    method: 'get'
  });
}