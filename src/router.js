import React from 'react';
import { Router, Route } from 'dva/router';
import RootRouter from './rootRouter';

function RouterConfig({ history }){
    return (
       <Router history={ history }>
				 	<Route path="/" component={RootRouter} />
			 </Router>
    )
}

export default RouterConfig;
