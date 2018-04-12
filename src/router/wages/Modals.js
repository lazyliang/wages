import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import {Table, Button, Input, Modal, Form} from 'antd'

const form = Form.create(
    {
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
const {Column} = Table
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
                    title="个人资料"
                    visible={appStore.modals === 'show'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form style={{width: 500}}>
                        <FormItem label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        {/*<FormItem>*/}
                        {/*<Button*/}
                        {/*onClick={this.submit}>确定</Button>*/}
                        {/*</FormItem>*/}
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.appStore.save({
                    ...values,
                    id: fields.id ? fields.id.value : '',
                    permissions: fields.permissions ? fields.permissions.value : []
                });
            }
        });

    };
}