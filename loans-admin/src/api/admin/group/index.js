import fetch from 'utils/fetch';

export function getAllGroupTypes() {
  return fetch({
    url: '/web/groupType/all',
    method: 'get'
  });
}

export function fetchTree(query) {
  return fetch({
    url: '/web/group/tree',
    method: 'get',
    params: query
  });
}


export function addObj(obj) {
  return fetch({
    url: '/web/group',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/web/group/' + id,
    method: 'get'
  });
}

export function delObj(id) {
  return fetch({
    url: '/web/group/' + id,
    method: 'delete'
  });
}

export function putObj(obj) {
  return fetch({
    url: '/web/group',
    method: 'put',
    data: obj
  });
}

export function getUsers(id) {
  return fetch({
    url: '/web/group/' + id + '/user',
    method: 'get'
  });
}

export function modifyUsers(id, data) {
  return fetch({
    url: '/web/group/' + id + '/user',
    method: 'put',
    params: data
  });
}


export function removeElementAuthority(id, data) {
  return fetch({
    url: '/web/group/' + id + '/authority/element/remove',
    method: 'post',
    params: data
  });
}

export function addElementAuthority(id, data) {
  return fetch({
    url: '/web/group/' + id + '/authority/element/add',
    method: 'post',
    params: data
  });
}

export function getElementAuthority(id) {
  return fetch({
    url: '/web/group/' + id + '/authority/element',
    method: 'get'
  });
}

export function modifyMenuAuthority(id, data) {
  return fetch({
    url: '/web/group/' + id + '/authority/menu',
    method: 'post',
    params: data
  });
}


export function getMenuAuthority(id) {
  return fetch({
    url: '/web/group/' + id + '/authority/menu',
    method: 'get'
  });
}


