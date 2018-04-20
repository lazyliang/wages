import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";
import { Table,Button,Spin,Card } from 'antd'
import  WagesModal  from './WagesModal'



const ButtonGroup = Button.Group
const {Column} = Table
@inject('wagesStore') @withRouter @observer
export default class List extends Component {
    componentDidMount(){
        this.props.wagesStore.initWages();
    }
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
                        <Column title="姓名" dataIndex="userName" key="userName" width={100}/>
                        <Column title="员工编号" dataIndex="num" key="num" width={100}/>
                        <Column title="总工资" dataIndex="sum" key="sum" width={100}/>
                        <Column title="年份" dataIndex="year" key="year"  width={100}/>
                        <Column title="月份" dataIndex="month" key="month"  width={100}/>
                        <Column title="操作" key="operator" width={160} render={(text, record) => (
                            <div>
                                {/*<Button type="primary" onClick={this.showModal.bind(this,record)}>查看详情</Button>*/}
                                {/*<Button type="default" onClick={this.handleEdit.bind(this,record)}>修改</Button>*/}
                                {/*<Button type="default" onClick={this.handleDelete.bind(this,record)}>删除</Button>*/}
                            </div>
                        )}/>
                    </Table>
                    <WagesModal/>

                </Spin>
            </Card>
        )
    }
    handleAdd = () => {
        this.props.wagesStore.initEdit()
    }
}