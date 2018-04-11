import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import { Table,Button } from 'antd'


const {Column} = Table
@inject('appStore') @observer @withRouter
export default class Main extends Component {
    componentDidMount(){
        this.props.appStore.initUser();
    }

    render() {
        const {appStore} = this.props
        return (
            <Table dataSource={appStore.list.slice()} pagination={appStore.pagination}
                   onChange={this.handleTableChange}
                   rowKey="id" bordered>
                <Column title="姓名" dataIndex="name" key="name" width={120}/>
                <Column title="性别" dataIndex="sex" key="sex" width={120}/>
                <Column title="年龄" dataIndex="age" key="age"  width={120}/>
                <Column title="操作" key="operator" width={160} render={(text, record) => (
                        <Button>test</Button>
                    )}/>
            </Table>
        )
    }
}
