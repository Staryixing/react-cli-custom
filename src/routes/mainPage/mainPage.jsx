import React, { Suspense } from 'react';
import { Button } from 'antd';
import {Route,Switch,Redirect} from 'dva/router';
import LoginServer from '@server/loginServer';
import styles from './mainPage.less';
import AnimatedRouter from 'react-animated-router'; 
import '../../router-transition-animate.css';
const AccountPage = React.lazy(() => import('@route/accountPage/accountPage.jsx'))
const RolePage = React.lazy(() => import('@route/rolePage/rolePage.jsx'))

class MainPage extends React.PureComponent{
    componentDidMount(){
        this.query()
    }

    async query(){
        const res = await LoginServer.test({
            params: {
                pageSize: 10,
                pageNum: 1
            }
        })  
        console.log('res', res)
    }
    jumpTo(path){
        this.props.history.push(path)
    }

    render(){
        return (
            <div className={styles.root}>
                主页面
                <Button type="primary">button</Button>
                <ul>
                    <li onClick={() =>this.jumpTo('/layout/role')}>角色</li>
                    <li onClick={() =>this.jumpTo('/layout/account')}>账户</li>
                    <li onClick={() =>this.jumpTo('/')}>首页</li>
                </ul>
                <AnimatedRouter>
                    <Suspense fallback={<div style={{ width: '100%', height: '100%' }}>...loading</div>}>     
                        <Switch>
                            <Route path="/layout/role" exact render={props=> <RolePage {...props} />}/>
                            <Route path="/layout/account"  exact render={props=> <AccountPage {...props} />}/>
                            <Redirect to="/layout/role"/>
                        </Switch>
                    </Suspense>
                </AnimatedRouter>
            </div>
        )
    }
}

export default MainPage
