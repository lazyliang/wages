import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import {Table, Button, Input, Modal, Form, Select} from 'antd'
const Option = Select.Option
const form = Form.create({
        onFieldsChange(props, changedFields) {
            props.wagesStore.onEditField(changedFields);
        },
        mapPropsToFields(props) {
            return {
                id: Form.createFormField(props.wagesStore.fields.id),
                userName: Form.createFormField(props.wagesStore.fields.userName),
                num: Form.createFormField(props.wagesStore.fields.num),
                year: Form.createFormField(props.wagesStore.fields.year),
                month: Form.createFormField(props.wagesStore.fields.month),
                baseWages: Form.createFormField(props.wagesStore.fields.baseWages),
                addtion: Form.createFormField(props.wagesStore.fields.addtion),
                overTime:Form.createFormField(props.wagesStore.fields.overTime),
                userId:Form.createFormField(props.wagesStore.fields.userId),
                yk:Form.createFormField(props.wagesStore.fields.yk),
            }
        }
    }
)

const FormItem = Form.Item
const {Column} = Table
@inject('wagesStore') @form @observer
export default class WagesModal extends Component {

    componentDidMount(){

    }
    handleCancel = () => {
        this.props.wagesStore.modal = 'hide'
    }

    render() {
        const {wagesStore} = this.props
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return (
            <div>
                {/*<Button type="primary" onClick={this.showModal}>Open</Button>*/}
                <Modal
                    title="工资编辑"
                    visible={wagesStore.modal === 'show'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form style={{width: 500}}>
                        {/*<FormItem label="姓名" {...formItemLayout}>*/}
                            {/*{getFieldDecorator('name', {*/}
                                {/*rules: [{required: true, message: '请填写用户名',}]*/}
                            {/*})(*/}
                                {/*<Input/>*/}
                            {/*)}*/}
                        {/*</FormItem>*/}
                        <FormItem label="用户名" {...formItemLayout} hasFeedback>
                            {getFieldDecorator('userId',
                                {
                                    rules: [{required: true, message:'请选择车系',}]
                                })(
                                <Select style={{ width: 120 }} onChange={this.handleChange} placeholder="-请选择用户-">
                                    { this.props.wagesStore.userInfos.map((item,index) => {
                                        return(
                                            <Option key ={`${item.id}`} value={`${item.id}`}>{item.name}</Option>
                                        )
                                    })}
                                </Select>
                            )}

                        </FormItem>
                        <FormItem label="员工编号" {...formItemLayout}>
                            {getFieldDecorator('num', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="工资年份" {...formItemLayout}>
                            {getFieldDecorator('year', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="工资月份" {...formItemLayout}>
                            {getFieldDecorator('month', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="基本工资" {...formItemLayout}>
                            {getFieldDecorator('baseWages', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="津贴" {...formItemLayout}>
                            {getFieldDecorator('addtion', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="加班工资" {...formItemLayout}>
                            {getFieldDecorator('overTime', {
                                rules: [{required: true, message: '请填写用户名',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="应扣工资" {...formItemLayout}>
                            {getFieldDecorator('yk', {
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


    handleOk = () => {
        const fields = this.props.wagesStore.editFields
        // const userInfo = this.props.appStore.userInfo
        this.props.form.validateFields((err, values) => {
            console.log(fields,'fields')
            console.log(values,'values')
            if (!err) {
                this.props.wagesStore.save({
                    ...values,
                    id: fields.id ? fields.id.value : '',
                    permissions: fields.permissions ? fields.permissions.value : []
                });
            }
        });
        this.props.wagesStore.modals = 'hide'
    };
}