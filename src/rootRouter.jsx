/* eslint-disable no-dupe-keys */
/**
 * Created by yixing on 2020/3/27.
 */
import React,{ Suspense } from 'react';
import {Route, Redirect} from 'dva/router';
import {connect} from 'dva';
import AnimatedRouter from 'react-animated-router'; 
import './router-transition-animate.css';
const MainPage = React.lazy(() => import('@route/mainPage/mainPage'))
const Login = React.lazy(() => import('@route/loginPage/login'))

class RootRouter extends React.Component{

    componentWillMount() {
        window.G_dispatch = this.props.dispatch;
        window.G_history = this.props.history;
    }

    render() {
        return (
            <Suspense fallback={<div style={{ width: '100%', height: '100%' }}>loading...</div>}>
                <AnimatedRouter>
                    <Route path="/" exact render={props=> <Login {...props} />}/>
                    <Route path="/layout" render={props=> <MainPage {...props} />} />
                    <Redirect to="/" />
                </AnimatedRouter>
            </Suspense>
        )
    }
}

export default  connect(() => ({}))(RootRouter) 
