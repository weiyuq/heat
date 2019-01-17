import { stringify } from 'qs';
import CommonConst from './constant/CommonConst';
import request from './utils/request';
import storage from './utils/Storage';

export async function refresh() {
    const refresh_token = CommonConst.refresh_token;
    if (refresh_token) {
        return login({
            grant_type: 'refresh_token',
            refresh_token: CommonConst.refresh_token,
        });
    }
    return Promise.reject(new Error('login_required'));
}
export async function login(params) {
    return request('/oauth2/access_token', {
        method: 'POST',
        body: {
            client_id: '17953450251798098136',
            client_secret: '08E9EC6793345759456CB8BAE52615F3',
            grant_type: 'password',
            ...params,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    }).then(data => {
        const { access_token, refresh_token, expires_in: expiresIn } = data;
        if (access_token) {
            CommonConst.access_token = access_token;
            CommonConst.refresh_token = refresh_token;
            CommonConst.expiresIn = expiresIn;
            storage.save({
                key: 'token',  // 注意:请不要在key中使用_下划线符号!
                data: {
                    access_token,
                    refresh_token,
                    expiresIn: expiresIn,
                },

            });
        }
        return data;
    });
}

export async function logout() {
    return request('/api2/logout', {}, false).finally(() => {
        CommonConst.access_token = '';
        CommonConst.navigation.navigate('Login');
        storage.remove({
            key: 'token'
        });
    });
}
export async function getUnits(params) {
    return request(`/api/iot/modules?${stringify(params)}`);
}
export async function getTimeUnit(id) {
    // console.log('getTimeUnit')
    // console.log(id)
    return request(`/api/iot/modules/${id}/sense`);
}