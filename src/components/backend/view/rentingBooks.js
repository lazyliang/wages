import React,{ Component } from 'react'
import {inject, observer} from "mobx-react";
import { Card, Table,Modal, Button, Input, Spin} from 'antd'
import BookInfoModal from './bookInfoModal'
import {withRouter} from "react-router-dom";
import Icon from "antd/es/icon";

const {Search} = Input;
const { Column }= Table;
const confirm = Modal.confirm;
@inject('bookStores')
@withRouter
@observer
export default class rentingBooks extends Component {

    componentWillMount() {
        this.props.bookStores.initBooks()

    }

    confirmBuyBooks = (record)=>{
        confirm({
            title:'您是否购买'+record.bookName,
            content:'',
            onOk:'购买',
            okCancel:'退出'
        })
    }
    confirmLease = (record)=>{
        confirm({
            title:"您是否租赁"+record.bookName,
            content:'',
            onOk:'租赁',
            okCancel:'退出'
        })
    }

    showAbstract = (record)=>{
        this.props.bookStores.showBookInfoModel(record);
    }

    search = (value)=>{
        this.props.bookStores.inquire(value)
    }

    changeTable = (pagination)=>{
        this.props.bookStores.initBooks(pagination.current)
    }

    render() {
        const { bookStores } = this.props;
        return(
            <div>
            <Card style={styles.cardContent}>
                <Spin spinning={this.props.bookStores.loading}>
                    <div>
                        <Search style = {{width: 300, float: 'left'}}
                                placeholder="input search text"
                                onSearch={this.search}
                                enterButton={"搜索"}/>
                    </div>

                    <div>
                        <Table align={'center'}
                               pagination={this.props.bookStores.pagination}
                               onChange={this.changeTable}
                               rowKey='id' bordered
                               dataSource={this.props.bookStores.bookInfo.slice()}>
                            <Column title="图书编号" dataIndex="id" key="id" width={100}/>
                            <Column title="图书名" dataIndex="bookName" key="bookName" width={100}/>
                            <Column title="作者" dataIndex="author" key="author" width={100}/>
                            <Column title="发行日期" dataIndex="publicationDate" key="publicationDate" width={100}/>
                            <Column title="更多信息" key="moreInfo" width={100} render={(text, record) => (
                                <div>
                                    {/*<Button onClick={this.showAbstract(record)} ><Icon type='book'/>摘要信息</Button>*/}
                                    <a onClick={this.showAbstract.bind(this, record)}><Icon type='book'/>摘要信息</a>
                                </div>
                            )}/>
                            <Column title="操作" key="operating" dataIndex="operating" width={60} render={(text, record)=>(
                                <div>
                                    <a onClick={this.confirmLease.bind(this, record)}><Icon type='inbox'/>租赁</a>
                                    <br></br>
                                    <a onClick={this.confirmBuyBooks.bind(this, record)}><Icon type='inbox'/>购买</a>
                                </div>
                            )}/>
                        </Table>
                        <BookInfoModal/>
                    </div>
                </Spin>
            </Card>
            </div>
        )
    }
}

const styles = {
    cardContent:{
        margin: '10px'
    }
};