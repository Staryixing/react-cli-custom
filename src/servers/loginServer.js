import HttpHelper from '@util/HttpHelper.js';
import { BaseURL } from '@constant/request.js';

class LoginServer extends HttpHelper{
    test = ({
        params = {},
        headers = {}
    }) => {
        return this.get(BaseURL+ '/integratedmachine',{
            params,
            headers
        })
    }

    login = ({
        params = {},
        headers = {}
    }) => {
        return this.post(BaseURL + '/user/login',{
            params,
            headers
        })
    }

    
}

export default new LoginServer()
