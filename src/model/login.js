import { routerRedux } from 'dva/router';
import LoginServer from '@server/loginServer.js'

export default {
    namespace: 'account',
    state: {

    },
    effects: {
        *login({payload, callback},{call,put}){
            const res = yield LoginServer.login({params: payload});
            if(res.code === 200){
                sessionStorage.setItem('userInfo',JSON.stringify(res.data))
                yield put(routerRedux.push('/layout'))
            }
        },
        *loginOut({},{call, put}){
            yield put(routerRedux.push('/'))
        }   
    },
    reducers: {

    }
}