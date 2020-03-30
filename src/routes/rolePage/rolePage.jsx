import React from 'react';
import { Button } from 'antd';
import styles from './rolePage.less';
class RolePage extends React.PureComponent{
    componentDidMount(){
        
    }
    render(){
        return (
            <div className={styles.root}>
                角色页面
                <Button type="primary">button</Button>
            </div>
        )
    }
}

export default RolePage