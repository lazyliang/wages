import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import {Table, Button, Spin, Card} from 'antd'
import Modal from './Modal'
import Modals from './Modals'

const {Column} = Table
@inject('appStore') @withRouter @observer
export default class Main extends Component {
    componentDidMount() {
        this.props.appStore.initUser(0);
    }

    render() {
        const {appStore} = this.props
        return (
            <Card style={styles.cardContent}>
                <div>
                    <Button type="primary" onClick={this.handleAdd}>新增</Button>
                </div>

                <Spin spinning={appStore.loading}>
                    <Table dataSource={appStore.list.slice()} pagination={appStore.pagination}
                           onChange={this.handleTableChange}
                           rowKey="id" bordered>
                        <Column title="姓名" dataIndex="name" key="name" width={100}/>
                        <Column title="登录名" dataIndex="loginName" key="loginName" width={100}/>
                        <Column title="性别" dataIndex="sex" key="sex" width={100}/>
                        <Column title="年龄" dataIndex="age" key="age" width={100}/>
                        <Column title="操作" key="operator" width={160} render={(text, record) => (
                            <div>
                                <Button type="primary" onClick={this.showModal.bind(this, record)}>查看详情</Button>
                                <Button type="default" onClick={this.handleEdit.bind(this, record)}>修改</Button>
                                <Button type="default" onClick={this.handleDelete.bind(this, record)}>删除</Button>
                            </div>
                        )}/>
                    </Table>
                    <Modal/>
                    <Modals/>

                </Spin>
            </Card>
        )
    }

    handleDelete = (record) => {
        this.props.appStore.deleteOne(record)
    }
    showModal = (record) => {
        this.props.appStore.showDetail(record)
        this.props.appStore.showModal();
    }

    handleAdd = () => {
        this.props.appStore.initEdit()
    }

    handleEdit = (record) => {
        this.props.appStore.showDetail(record)
        this.props.appStore.showModals(record);
    }

    handleTableChange = (pagination) => {
        this.props.appStore.initUser(pagination.current-1)
        console.log(pagination,'pa')
    }
}
const styles = {
    cardContent: {
        margin: '10px'
    }
}