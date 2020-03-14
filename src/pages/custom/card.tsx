import React from 'react';

import {
  TabBar,
  Badge,
  Button,
  SearchBar,
  List
} from 'antd-mobile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faYenSign,
  faChartLine,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';

import TopNavBar from '../../components/TopNavBar';
import BaseCard from './BaseCard';
import GoodsCard from './GoodsCard';
import OrderCard from './OrderCard';
import ArrearCard from './ArrearCard';

import { connect } from 'dva';



interface ICustomCardState {
  selectedTab: string,
  customid: number,
  customname : string,
  saler : string,
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
      selectedTab: "baseTab",
      customid : 0,
      customname : "",
      saler : "",
    };
  }

  // componentWillMount() {
  //   const { dispatch, location } = this.props;
  //   const { customid , customname, saler } = location.state;
  //   this.setState({
  //     customid,
  //     customname,
  //     saler
  //   });
  // }

  public render() {
    const { selectedTab } = this.state;
    const { state } = this.props.location;
    const customid = state ? state.customid : 0, 
        saler = state ? state.saler : '',
        customname = state ? state.customname : '';
    return (
      <div>
        <TopNavBar title="客户档案-详细" />
        <List>
          <List.Item extra={saler} >{customname}</List.Item>
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
            icon={<FontAwesomeIcon icon={faAddressCard} size="lg" />}
            selectedIcon={<FontAwesomeIcon icon={faAddressCard} size="lg" />}
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
            icon={<FontAwesomeIcon icon={faCreditCard} size="lg" />}
            selectedIcon={<FontAwesomeIcon icon={faCreditCard} size="lg" />}
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
            icon={<FontAwesomeIcon icon={faChartLine} size="lg" />}
            selectedIcon={<FontAwesomeIcon icon={faChartLine} size="lg" />}
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
            icon={<FontAwesomeIcon icon={faYenSign} size="lg" />}
            selectedIcon={<FontAwesomeIcon icon={faYenSign} size="lg" />}
            title="欠款信息"
            key="arrears"
            selected={selectedTab === 'arrearsTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'arrearsTab',
              });
            }}
          >
            <ArrearCard cid={customid}  />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Card;
