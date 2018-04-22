import {inject, observer} from "mobx-react/index";

import React, {Component} from "react";
import { Input, Modal, Form} from 'antd'

const form = Form.create({
        onFieldsChange(props, changedFields) {
            props.appStore.onEditField(changedFields);
        },
        mapPropsToFields(props) {
            return {
                id: Form.createFormField(props.appStore.fields.id),
                name: Form.createFormField(props.appStore.fields.name),
                age: Form.createFormField(props.appStore.fields.age),
                sex: Form.createFormField(props.appStore.fields.sex),
                address: Form.createFormField(props.appStore.fields.address),
                tel: Form.createFormField(props.appStore.fields.tel),
                password: Form.createFormField(props.appStore.fields.password),
                loginName:Form.createFormField(props.appStore.fields.loginName),
            }
        }
    }
)
const FormItem = Form.Item
@inject('appStore') @form @observer
export default class Main extends Component {

    componentDidMount(){

    }
    handleCancel = () => {
        this.props.appStore.modals = 'hide'
    }

    render() {
        const {appStore} = this.props
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <div>
                {/*<Button type="primary" onClick={this.showModal}>Open</Button>*/}
                <Modal
                    title="信息编辑"
                    visible={appStore.modals === 'show'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form style={{width: 500}}>
                        <FormItem label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '请填写姓名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {getFieldDecorator('age', {
                                rules: [{required: true, message: '请填写年龄',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {getFieldDecorator('sex', {
                                rules: [{required: true, message: '请填写性别',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="地址" {...formItemLayout}>
                            {getFieldDecorator('address', {
                                rules: [{required: true, message: '请填写地址',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="联系电话" {...formItemLayout}>
                            {getFieldDecorator('tel', {
                                rules: [{required: true, message: '请填写联系电话',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="登录名" {...formItemLayout}>
                            {getFieldDecorator('loginName', {
                                rules: [{required: true, message: '请填写登录名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请填写密码',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }

    submit = () => {
        let form = this.props.form
        form.validateFields((err, values) => {
            if (!err) {
                this.props.appStore.submit()
            }
        })
    }
    handleOk = () => {
        const fields = this.props.appStore.editFields
        const userInfo = this.props.appStore.userInfo
        console.log(userInfo,'userInfo')
        this.props.form.validateFields((err, values) => {
            console.log(fields,'fields')
            console.log(values,'values')
            if (!err) {
                this.props.appStore.save({
                    ...values,
                    id: fields.id ? fields.id.value : '',
                    permissions: fields.permissions ? fields.permissions.value : []
                });
            }
        });
   this.props.appStore.modals = 'hide'
    };
}