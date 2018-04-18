import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import { Table,Button,Spin,Card } from 'antd'



const ButtonGroup = Button.Group
const {Column} = Table
@inject('wagesStore') @withRouter @observer
export default class List extends Component {
    render(){
        const { wagesStore } = this.props
        return(
            <Card >
                <div>
                    <Button type="primary" onClick={this.handleAdd}>新增</Button>
                </div>

                <Spin spinning={wagesStore.loading}>
                    <Table dataSource={wagesStore.list.slice()} pagination={wagesStore.pagination}
                           onChange={this.handleTableChange}
                           rowKey="id" bordered>
                        <Column title="姓名" dataIndex="name" key="name" width={100}/>
                        <Column title="登录名" dataIndex="loginName" key="loginName" width={100}/>
                        <Column title="性别" dataIndex="sex" key="sex" width={100}/>
                        <Column title="年龄" dataIndex="age" key="age"  width={100}/>
                        <Column title="操作" key="operator" width={160} render={(text, record) => (
                            <div>
                                <Button type="primary" onClick={this.showModal.bind(this,record)}>查看详情</Button>
                                <Button type="default" onClick={this.handleEdit.bind(this,record)}>修改</Button>
                                <Button type="default" onClick={this.handleDelete.bind(this,record)}>删除</Button>
                            </div>
                        )}/>
                    </Table>
                    {/*<Modal/>*/}
                    {/*<Modals/>*/}

                </Spin>
            </Card>
        )
    }
}