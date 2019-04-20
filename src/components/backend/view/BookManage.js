import React from 'react'
import {observer, inject} from "mobx-react";
import {withRouter} from "react-router-dom";
import {Card, Button, Table, Modal, Icon, Cascader} from "antd"

const { Column } = Table
const { confirm } = Modal

@inject("bookStores")
@withRouter
@observer
export default class BookManage extends React.Component{

    componentDidMount() {
        this.props.bookStores.initBooks();
    }

    filter = (inputValue, path) => {
        return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    changeTable = (pagination)=>{
        this.props.bookStores.initBooks(pagination.current)
    }

    showAbstract = (record)=>{
        this.props.bookStores.showBookInfoModel(record);
    }

    confirmModify = (record)=>{
        confirm({
            title:"确认修改"+record.bookName + '么？',
            content:'',
            onOk:'新增',
            okCancel:'退出'
        })
    }

    confirmDelete = (record)=>{
        confirm({
            title:'确认删除' + record.bookName + '么？',
            content:'',
            onOk:'购买',
            okCancel:'退出'
        })
    }

    render() {
        return(
            <div>
                <Card>
                    <div>
                        <Cascader
                            options={options}
                            onChange={''}
                            placeholder="Please select"
                            showSearch={this.filter}
                        />
                        <Button onClick={''} size={'Default'} >
                            搜索
                        </Button>
                        <Button onClick={''} size={'Default'} style={{float: 'right'}} >
                            <Icon type="plus" />
                            新增图书
                        </Button>
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
                                    <a onClick={this.confirmModify.bind(this, record)}><Icon type="edit" />修改</a>
                                    <br></br>
                                    <a onClick={this.confirmDelete.bind(this, record)}><Icon type="delete" />删除</a>

                                </div>
                            )}/>
                        </Table>
                    </div>
                </Card>
            </div>
        )

    }

}
const options = [{
    value: 'InternetNovel',
    label: '网络小说',
    children: [
        {
            value: 'wuxia',
            label: '武侠'
        },
        {
            value:'xuanhuan',
            label:'玄幻'
        },
        {
            value:'love',
            label:'爱情'
        }
    ]
},
    {
        value: 'worldFamousNovel',
        label: '世界名著',
        children: [
            {
                value: 'domestic',
                label: '国内',
            },
            {
                value:'Foreign',
                label:'国外'
            }
        ]
    }];