import bookStores from "../bookStores";
import {inject, observer} from "mobx-react"
import React, {Component} from "react";
import {Form, Input, Modal} from "antd";
import {withRouter} from "react-router-dom";

const form = Form.create({
    //{

    onFieldsChange(props, changedFields) {
        props.bookStores.onEditField(changedFields);
    }, mapPropsToFields(props) {
        const fields = props.bookStores.addParams
        return {
            id: Form.createFormField({value: fields.id}),
            bookName: Form.createFormField({value: fields.bookName}),
            author: Form.createFormField({value: fields.author }),
            publicationDate: Form.createFormField({value: fields.publicationDate}),
            abstracts: Form.createFormField({value: fields.abstracts}),
            type1: Form.createFormField({value: fields.type1}),
            type2: Form.createFormField({value: fields.type2}),

        }
    }
//}
})(ModifyModal)


const { FormItem } = Form
@inject('bookStores') @form @withRouter @observer
export default class ModifyModal extends Component {



    hideModel=() =>{
        this.props.bookStores.hideModel();
    }

    render() {
        const { bookStores } = this.props;
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        }
        return(
            <div>
                <Modal type="primary"
                       visible={this.props.bookStores.bookModifyModalStatus === 'show'}
                       onCancel={this.hideModel}  onOk={this.hideModel}
                       title={'修改图书信息'}
                       footer={null}>
                    <Form style={{width: 500}}>
                        <FormItem label="图书名称" {...formItemLayout}>
                            {getFieldDecorator('bookName', {
                                rules: [{required: true, message: '请填写图书名称',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="作者" {...formItemLayout}>
                            {getFieldDecorator('author', {
                                rules: [{required: true, message: '请填写作者',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="出版日期" {...formItemLayout}>
                            {getFieldDecorator('publicationDate', {
                                rules: [{required: true, message: '请填写出版日期',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="内容摘要" {...formItemLayout}>
                            {getFieldDecorator('abstracts', {
                                rules: [{required: true, message: '',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="类型1" {...formItemLayout}>
                            {getFieldDecorator('type1', {
                                rules: [{required: true, message: '类型',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="类型2" {...formItemLayout}>
                            {getFieldDecorator('type2', {
                                rules: [{required: true, message: '类型2',}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>

                </Modal>
            </div>
        )
    }
}
