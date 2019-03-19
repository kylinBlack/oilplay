import fetch from 'utils/fetch';

export function page(query) {
    return fetch({
        url: '/web/gateLog/page',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/web/gateLog',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/web/gateLog/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/web/gateLog/' + id,
        method: 'delete'
    })
}

export function putObj(obj) {
    return fetch({
        url: '/web/gateLog',
        method: 'put',
        data: obj
    })
}
