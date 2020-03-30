import { message,notification } from 'antd';
const oldFetchfn = window.fetch;

// 更新原生fetch，增加超时机制
window.fetch = function (url, params, timeOut) {
    const fetchPromise   = oldFetchfn(url, params);
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // 网络超时之后 抛出错误 到processError
            reject(new Error('请求超时，请稍后重试'));
        }, 3000);
    });
    return Promise.race([fetchPromise, timeoutPromise]);
};


class HttpHelper  {
    constructor(){

    }
    /**
     * 设置请求头
     * @param {*} headers 请求头
     */
    static creatHeaders(headers){
        let originHeaders = {
            'Content-Type': 'application/json'
        }
        // 判断当前本地是否存储token,如果存储token则添加到header头
        let localData = sessionStorage.getItem('userInfo');
        if(localData){
            originHeaders = {
                ...originHeaders,
                'x-token':JSON.parse(localData).token
            }
        }
    
        if(headers){
            return Object.assign(originHeaders,headers)
        }else {
            return originHeaders;
        }
    }
    
    /**
     * 请求本身失败状态
     * @param {*} url 请求地址
     */
    static processError({url, error}){
        notification.error({
            message: `请求错误 ${url}`,
            description: `${error}`
        })
        if (typeof (error) === 'string') {
            return Promise.reject('网络请求出错，请稍后重试')
        } else if (typeof (error) === 'object') {
            return Promise.reject('网络请求出错，请稍后重试')
        } else {
            return Promise.reject('网络请求出错，请稍后重试')
        }
    }

    /**
     * 请求响应拦截
     * @param {*} response 请求响应
     */
    static async responseIntercept(response){
        console.log(this.props, 'props')
        if(!response){
            return Promise.reject('请求返回为空，请稍后重试')
        }
        if(response && response.status){
            const { url,status } = response;  // 请求本身
            let res = await response.json();  // 请求响应返回
            if(status === 200){
                if(res.code !== 200){
                    message.error(res.message)
                }
                if(res.code === 10402){
                    // 重新登入 不要这样写 最好调用redux（要改
                    window.G_dispatch({
                        type: 'account/loginOut',
                        payload: {}
                    })
                    let foo = window.location.href.split('#')[0]
                    window.location.href = foo;
                }
                return res;
            }else{
               return Promise.reject(`请求错误 ${status}`)
            }
        }
    }

    /**
     * 创建post请求头的body
     * @param {*} headers 请求头
     * @param {*} params 请求参数
     */
    static creatBody({headers,params}){
        if(params){
            if(typeof (params) === 'string'){
                return params
            }
            if(headers && headers['Content-Type'] === 'application/x-www-form-urlencoded'){
                let body = '';
                for(let key in params){
                    if(key !== 'sysId'){
                        body = body + key + '=' + params[key] + '&'
                    }
                }
                body = body + 'sysId=qWechat'
                return body;
            }else {
                return JSON.stringify(params);
            }
        }else{
            return null
        }
    }
    /**
     * get请求
     * @param {*} urlt 请求地址
     * @param {*} params 参数
     * @param {*} headers 请求头
     */
    get(urlt,{ params, headers }){
        let url = urlt;
        if(params){
            const paramsArray = [];
            // 拼接参数
            Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURI(params[key])}`));
            if (url.search(/\?/) === -1) {
                url += `?${paramsArray.join('&')}`;
            } else {
                url += `&${paramsArray.join('&')}`;
            }
        }
        let trueHeaders =  HttpHelper.creatHeaders(headers)
        return fetch(url, {
            method: 'GET',
            headers: trueHeaders
        }).then((response) => {
            return HttpHelper.responseIntercept(response)
        }).catch((error) => {
            return HttpHelper.processError({url,error});
        })
    }
    /**
     * post请求
     * @param {*} urlt 请求地址
     * @param {*} params 参数
     * @param {*} headers 请求头
     */
    post (url, {params, headers}){
        let body = HttpHelper.creatBody({headers, params});
        let trueHeaders = HttpHelper.creatHeaders(headers);
        let paramsEntity = {
            method: 'POST',
            headers: trueHeaders,
        }
        if (body) {
            paramsEntity.body = body;
        }
        return fetch(url, paramsEntity).then((response) => {
            return HttpHelper.responseIntercept(response)
        }).catch((error) => {
            return HttpHelper.processError({url,error});
        })
    }
    /**
     * put请求
     * @param {*} urlt 请求地址
     * @param {*} params 参数
     * @param {*} headers 请求头
     */
    put(url, {params, headers}){
        let body = JSON.stringify(params) || '';
        let trueHeaders = HttpHelper.creatHeaders(headers);
        return fetch(url, {
            method: 'PUT',
            headers: trueHeaders,
            body,
        }).then((response) => {
            return HttpHelper.responseIntercept(response) 
        }).catch((error) => {
            return HttpHelper.processError({url,error});
        })
    }
    /**
     * delete请求
     * @param {*} urlt 请求地址
     * @param {*} params 参数
     * @param {*} headers 请求头
     */
    delete(url, {params, headers}){
        let body = JSON.stringify(params) || '';
        let trueHeaders = HttpHelper.creatHeaders(headers);
        return fetch(url, {
            method: 'DELETE',
            headers: trueHeaders,
            body,
        }).then((response) => {
            return HttpHelper.responseIntercept(response) 
        }).catch((error) => {
            return HttpHelper.processError({url,error});
        })
    }

}

export default HttpHelper
