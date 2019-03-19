import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/web/element/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/web/element',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/web/element/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/web/element/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/web/element',
    method: 'put',
    data: obj
  })
}
