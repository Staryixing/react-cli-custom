import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from './login.less';

class Login extends React.PureComponent{

    onFinish = (values)=>{
        // console.log('values', values)
        this.props.dispatch({
            type: 'account/login',
            payload: {
                username: values.username,
                password: 'e10adc3949ba59abbe56e057f20f883e'
            }
        })
    }

    onFinishFailed(errorInfo){
        console.log('error',errorInfo)
    }
    render(){
        const layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <div className={styles.root} >
                <div className={styles.title}>停车机器人业务管理系统</div>
                <Form
                    {...layout} name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        label="账户:"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码:"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default connect(() => ({}))(Login) 
