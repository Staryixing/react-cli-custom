import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
import router from './router.js';
import './index.css';
import * as serviceWorker from './serviceWorker';
import registerModels from '@model/index.js';

const app = dva({
  history: createHistory(),
  initialState: {},
  onError(e){
      console.log('dva_onError', e);// eslint-disable-line
  }
})

// 3. 注册数据模型Model
registerModels(app);

// 4. 注册路由Router
app.router(router);

// 5. start 
app.start('#root')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
