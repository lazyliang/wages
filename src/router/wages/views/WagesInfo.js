import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import { Table,Button,Spin ,Modal } from 'antd'


const {Column} = Table
@inject('wagesStore')  @withRouter @observer
export default class WagesInfo extends Component {
    handleCancel= () =>{
        this.props.wagesStore.modals = 'hide'
    }
    render(){
        const { wagesStore } = this.props
        return(
            <div>
                {/*<Button type="primary" onClick={this.showModal}>Open</Button>*/}
                <Modal
                    title="工资明细"
                    visible={wagesStore.modals ==='show'}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}>
                    <div align="left">
                        <p>员工姓名：{wagesStore.users.userName}</p>
                        <p>员工编号：{wagesStore.users.num}</p>
                        <p>具体时间：{wagesStore.users.year+'年'+wagesStore.users.month+'月'}</p>
                        <p>基础工资：{wagesStore.users.baseWages+'元'}</p>
                        <p>工作津贴：{wagesStore.users.addtion+'元'}</p>
                        <p>加班工资：{wagesStore.users.overTime+'元'}</p>
                        <p>应扣工资：{wagesStore.users.yk+'元'}</p>
                        <p>总计工资：{wagesStore.users.sum+'元'}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}