import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/web/fluxPlatformProduct/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/web/fluxPlatformProduct',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/web/fluxPlatformProduct/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/web/fluxPlatformProduct/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/web/fluxPlatformProduct',
    method: 'put',
    data: obj
  })
}

export function getAllObj() {
  return fetch({
    url: '/web/fluxPlatformAgent/all',
    method: 'get'
  })
}


export function updateStatus(obj={id:'',status:''}) {
  return fetch({
    url: '/web/fluxPlatformProduct/updateStatus',
    method: 'get',
    params: obj
  })
}