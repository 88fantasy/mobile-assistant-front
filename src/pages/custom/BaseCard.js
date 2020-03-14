import React, { Component } from 'react'

import {
    Button,
    SearchBar,
    List,
    Card
}  from 'antd-mobile';

import { connect } from 'dva';


// interface ICustomCardData {
//   customid: number,
//   customOpcode?: string,
//   customName?: string,
//   saler?: string;
//   officeAddress?: string,
//   wareAddress?: string,
//   credit: number,
//   canUseCredit?: number,
//   usedCreditDays: number,
//   unOrderTotal: number,
//   usedCredit: number,
//   customMemo:[],
// }


@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class BaseCard extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      
    }
  }

  componentDidMount() {
    const { dispatch, cid } = this.props;
    dispatch({
      type: 'custom/queryCustomInfo',
        payload: {
          customid :  cid,
          stageid: 1,
        },
    });
  }
  
  render(){
    const { custom } = this.props;
    const { customInfo } = custom;
    const customMemo  = customInfo.customMemo || [];
    return(
      <div>
        <List>
          <List.Item extra={customInfo.customOpcode} >客户编码</List.Item>
          {/* <List.Item extra={customInfo.officeAddress} wrap >办公地址</List.Item>
          <List.Item extra={customInfo.wareAddress} wrap >仓库地址</List.Item> */}
        </List>

        <List renderHeader={() => '资信情况'}>
          <List.Item extra={customInfo.credit} >资信额度</List.Item>
          <List.Item extra={customInfo.canUseCredit} >当前可用金额</List.Item>
          <List.Item extra={customInfo.usedCreditDays} >欠款天数</List.Item>
          {/* <List.Item extra={customInfo.unOrderTotal} >未开票金额</List.Item> */}
          <List.Item extra={customInfo.usedCredit} >现欠款</List.Item>
          <List.Item extra={customInfo.creditInfo} wrap >详细资信情况</List.Item>
        </List>

        <List renderHeader={() => '客户注意事项'}>
          {
            customMemo.map( item => {
              return (
                <List.Item wrap>
                  {item}
                </List.Item>
              )
            })
          }
        </List>
      </div>
       
    )
  }
}

export default BaseCard;