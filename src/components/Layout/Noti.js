import {inject, observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import React, {Component} from "react";

@inject('appStore') @withRouter @observer
export default class Noti extends Component {
render(){
    return(
        <div>东风风神各专营店总经理、服务经理、备件主管：

            关于东风风神售后技术服务平台上线试运行的通知如下：

            1、东风风神售后技术服务平台（以下简称平台）由东风风神网络版备件目录升级而来，在其基础上新增了简报及快讯、维修手册、电路图册（开发中）、故障诊断（开发中）、钥匙密码（开发中）等模块。

            2、平台以网站形式运行，网站域名仍为http://www.dfpv-epc.com和http://www.dfpv-epc.com.cn

            3、现有的备件目录账号依然沿用，每个专营店需要新申请一个服务经理账号和一个技术主管账号；新建专营店最多可申请一个服务经理账号、一个技术主管账号和三个备件目录账号。

            4、现有的备件目录所有车型数据及功能依然沿用；维修手册已上传AX4车型和AX7车型的数据，可进行相关内容的查询，后续将逐步丰富其它车型的数据。

            5、每个账号都不能同时在多台设备上进行登录，请各专营店合理分配账号。

            6、账号申请需要填写《附件一：帐号申请表》发送至邮箱pvliuxuan@dfpv.com.cn；账号和密码要求是字母与数字的组合，账号为8位，密码不少于6位。

            7、平台使用说明请参考《附件二：东风风神售后技术服务平台使用指南》。

            8、在平台试运行期间，如您发现平台的任何问题，或对平台有任何使用上的意见或建议，请前往东风风神售后技术服务平台试运行使用调查页面（网址https://www.wjx.cn/jq/21475033.aspx）进行反馈，我们将充分尊重您的意见并不断完善平台内容。

            9、以上未尽事宜，请与备件技术室王健联系，电话027-84583126，邮箱pvwjian@dfpv.com.cn。如有其它规定，将另行通知。</div>
    )
}
}