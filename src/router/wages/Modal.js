import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import { Table,Button,Spin ,Modal } from 'antd'


const {Column} = Table
@inject('appStore')  @withRouter @observer
export default class Main extends Component {
    handleCancel= () =>{
        this.props.appStore.modal = 'hide'
    }
    render(){
        const { appStore } = this.props
        return(
            <div>
                {/*<Button type="primary" onClick={this.showModal}>Open</Button>*/}
                <Modal
                    title="个人资料"
                    visible={appStore.modal ==='show'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                footer={null}>
                   <div align="left">
                    <p>姓名：{appStore.userInfo.name}</p>
                    <p>年龄：{appStore.userInfo.age}</p>
                    <p>性别：{appStore.userInfo.sex}</p>
                    <p>地址：{appStore.userInfo.address}</p>
                    <p>联系电话：{appStore.userInfo.tel}</p>
                   </div>
                </Modal>
            </div>
        )
    }
}