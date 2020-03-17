import React from 'react';

import { TabBar, List } from 'antd-mobile';

import ContactsIcon from '@material-ui/icons/Contacts';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PaymentIcon from '@material-ui/icons/Payment';
import MoneyIcon from '@material-ui/icons/Money';

import { connect } from 'dva';
import TopNavBar from '@/components/TopNavBar';
import BaseCard from './BaseCard';
import GoodsCard from './GoodsCard';
import OrderCard from './OrderCard';
import ArrearCard from './ArrearCard';
import ReceivesCard from './ReceivesCard';

interface ICustomCardState {
  selectedTab: string;
}

interface ICustomProps {
  dispatch?: any;
  loading?: boolean;
  location: any;
}

@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class Card extends React.Component<ICustomProps, ICustomCardState> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedTab: 'baseTab',
    };
  }

  render() {
    const { selectedTab } = this.state;
    const { location } = this.props;
    const { state } = location;
    const customid = state ? state.customid : 0;
    const saler = state ? state.saler : '';
    const customname = state ? state.customname : '';
    return (
      <div>
        <TopNavBar title="客户档案-详细" />
        <List>
          <List.Item extra={saler}>{customname}</List.Item>
        </List>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="top"
        >
          <TabBar.Item
            title="基本信息"
            key="base"
            icon={<ContactsIcon fontSize="small" />}
            selectedIcon={<ContactsIcon fontSize="small" />}
            selected={selectedTab === 'baseTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'baseTab',
              });
            }}
          >
            <BaseCard cid={customid} />
          </TabBar.Item>

          <TabBar.Item
            icon={<PaymentIcon fontSize="small" />}
            selectedIcon={<PaymentIcon fontSize="small" />}
            title="价格及库存"
            key="goods"
            selected={selectedTab === 'goodsTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'goodsTab',
              });
            }}
          >
            <GoodsCard cid={customid} />
          </TabBar.Item>
          <TabBar.Item
            icon={<EqualizerIcon fontSize="small" />}
            selectedIcon={<EqualizerIcon fontSize="small" />}
            title="历史订单"
            key="order"
            selected={selectedTab === 'orderTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'orderTab',
              });
            }}
          >
            <OrderCard cid={customid} />
          </TabBar.Item>

          <TabBar.Item
            icon={<LocalAtmIcon fontSize="small" />}
            selectedIcon={<LocalAtmIcon fontSize="small" />}
            title="欠款信息"
            key="arrears"
            selected={selectedTab === 'arrearsTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'arrearsTab',
              });
            }}
          >
            <ArrearCard cid={customid} />
          </TabBar.Item>
          <TabBar.Item
            icon={<MoneyIcon fontSize="small" />}
            selectedIcon={<MoneyIcon fontSize="small" />}
            title="销售冲收"
            key="receives"
            selected={selectedTab === 'receivesTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'receivesTab',
              });
            }}
          >
            <ReceivesCard cid={customid} />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Card;
