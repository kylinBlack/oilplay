import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/web/user/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/web/user',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/web/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/web/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/web/user',
    method: 'put',
    data: obj
  })
}
