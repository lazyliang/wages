import React,{Component} from  'react'
import { observer, inject } from 'mobx-react'
import  { Form, Icon, Input, Button, Checkbox,Card } from 'antd'
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
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="loginName" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>

                        <Button type="primary" onClick={this.validateAndLogin} className="login-form-button">
                            Log in
                        </Button>

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

