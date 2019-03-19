import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/web/groupType/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/web/groupType',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/web/groupType/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/web/groupType/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/web/groupType',
    method: 'put',
    data: obj
  })
}
