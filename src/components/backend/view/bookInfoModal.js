import bookStores from "../bookStores";
import {inject, observer} from "mobx-react"
import React, {Component} from "react";
import {Modal} from "antd";
import {withRouter} from "react-router-dom";

@inject('bookStores') @withRouter @observer
export default class bookInfoModal extends Component {
    hideModel=() =>{
        this.props.bookStores.hideModel();
        console.log(this.props.bookStores.bookInfoModelStatus,'hhhhhhhh',this.props.bookStores.rowInfo.bookName)
    }

    render() {
        const { bookStores } = this.props;
        return(
            <div>
                <Modal type="primary"
                       visible={this.props.bookStores.bookInfoModelStatus === 'show'}
                       onCancel={this.hideModel}  onOk={this.hideModel}
                       title={this.props.bookStores.rowInfo.bookName}>
                    <p>{this.props.bookStores.rowInfo.abstracts}</p>

                </Modal>
            </div>
        )
    }
}