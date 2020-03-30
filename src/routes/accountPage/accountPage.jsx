import React from 'react';
import { Button } from 'antd';
import styles from './accountPage.less';
class AccountPage extends React.PureComponent{
    componentDidMount(){
        
    }
    render(){
        return (
            <div className={styles.root}>
                账户页面
                <Button type="primary">button</Button>
            </div>
        )
    }
}

export default AccountPage