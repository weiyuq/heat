import {NavigationActions, StackActions} from 'react-navigation';
import {Alert} from "react-native";
import { stringify } from 'qs';
import CommonConst from '../constant/CommonConst';
import { refresh } from '../service';

// import {createAction} from './index'

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const HEADER_FORM = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
};

const HEADER_JSON = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status >= 400 && response.status < 500) {
        return response;
    }
    const errortext = response.statusText;
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}
/**
 * 刷新token(自动检查token时用)
 * @param params
 */
export function isAuthError({ error, error_code: code }) {
    return (
        error === 'invalid_token' ||
        error === 'Miss required parameter (access_token)' ||
        code === 21336
    );
}
let refreshing;
export async function refreshToken() {
    console.log('refreshToken')
    if (refreshing === undefined) {
        refreshing = refresh()
            .then(data => {
                if (!data.access_token) {
                    return Promise.reject(data);
                }
                return data;
            })
            .catch(() => {
                return redirectToLogin().then(() => {
                    return Promise.reject(new Error('login required'));
                });
            })
            .finally(() => {
                refreshing = undefined;
            });
    }
    return refreshing;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} [retry] retry config
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options, retry = true) {
    let defaultOptions = {
        method: 'get',
    };
    const newOptions = { ...defaultOptions, ...options };
    const method = newOptions.method.toLowerCase();
    if (method === 'post' || method === 'put') {
        newOptions.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            ...newOptions.headers,
        };

        if (typeof newOptions.body !== 'string') {
            switch (newOptions.headers['Content-Type']) {
                case 'application/json; charset=utf-8':
                    newOptions.body = JSON.stringify(newOptions.body);
                    break;
                case 'application/x-www-form-urlencoded;charset=UTF-8':
                    newOptions.body = stringify(newOptions.body);
                    break;
                default:
                    break;
            }
        }
    }
    let newUrl = `${CommonConst.server}${url}`;
    const token = CommonConst.access_token;
    if (newOptions.params && url.indexOf('?') === -1) {
        newUrl = `${newUrl}?${stringify(newOptions.params)}`;
    }
    if(token && url.indexOf('oauth2') === -1) {
        if(url.indexOf('?') === -1) {
            newUrl = `${newUrl}?access_token=${token}`;
        } else  {
            newUrl = `${newUrl}&access_token=${token}`;
        }
    }
    return fetch(newUrl, newOptions)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            if (data.error && retry && isAuthError(data)) {
                return refreshToken()
                    .then(() => {
                        return request(url, options, false);
                    })
                    .catch(() => data);
            }
            return data;
        })
        .then(data => {
            return data;
        })
        .catch(e => {
            Alert.alert(
                'Error',
                '请求失败',
            )
        });
}