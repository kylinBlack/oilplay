import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/web/fluxPlatformAgent/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/web/fluxPlatformAgent',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/web/fluxPlatformAgent/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/web/fluxPlatformAgent/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/web/fluxPlatformAgent',
    method: 'put',
    data: obj
  })
}


export function updateStatus(obj={id:'',status:''}) {
  return fetch({
    url: '/web/fluxPlatformAgent/updateStatus',
    method: 'get',
    params: obj
  })
}

export function findProvince() {
  return fetch({
    url: '/web/province/all',
    method: 'get'
  })
}

export function findCity(provinceCode) {
  return fetch({
    url: '/web/city/findByProvince',
    method: 'get',
    params:{provinceCode}
  })
}