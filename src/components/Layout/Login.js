import React,{Component} from  'react'
import { observer, inject } from 'mobx-react'
import  { Form, Icon, Input, Button } from 'antd'
import './index.css'
import bg from '../assets/imgs/loginBg.jpeg'
const FormItem = Form.Item;
const form =Form.create()

// ({
//     onFieldsChange(props,changedFields){
//       props.appStore.onFormsChange(changedFields);
//     },
//     mapPropsToFields(props){
//       return{
//         loginName:Form.createFormField(props.appStore.fields.loginName),
//          password:Form.createFormField(props.appStore.fields.password)
//
//       }
//     }
// })


@inject('appStore')@form  @observer
export default class Login extends Component {

    validateAndLogin = () => {
        const {login} = this.props.appStore
        const {validateFieldsAndScroll} = this.props.form
        validateFieldsAndScroll((errors,values)=>{
            if(errors)return
            login(values)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={styles.bg} align='center'>
                <div style={styles.loginForm}>
                    <Form onSubmit={this.handleSubmit} className="login-form" style={{margin: '12%'}}>
                        <FormItem>
                            {getFieldDecorator('loginName', {
                                rules: [{ required: true, message: '请输入您的登录名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入您的密码！' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                        <Button type="primary" onClick={this.validateAndLogin} className="login-form-button">
                            登 录
                        </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    calculate = () =>{
        this.props.appStore.getJava();
    }

}
const styles={
    bg: {
        width: '100vw',
        height: '100vh',
        background: `url(${bg}) no-repeat`,
        backgroundSize: 'cover',
        position: 'relative'
    },
    loginForm: {
        position: 'absolute',
        width: '25%',
        height: '43%',
        top: '17%',
        left: '59%',
        boxShadow: '0 0 100px rgba(0, 0, 0, .08)',
    },
}

