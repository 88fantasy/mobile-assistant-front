import React from 'react';
import { Tabs, 
  Badge,
  SearchBar,
  List,
  Button
} from 'antd-mobile';


import TopNavBar from '@/components/TopNavBar';

import { connect } from 'dva';

import router from 'umi/router';

import { getAccount } from '@/utils/authority';

const styles = require('./index.less');


interface ICustomData {
  customid: number;
  customopcode: string;
  customname: string;
  salername: string;
  creditinfo?: string;
}

interface ICustomState {
  searchValue: string;
  visible: boolean;
}

interface ICustomProps {
  dispatch?: any;
  loading?: boolean;
  custom : {
    customData : ICustomData[]
  };
  account : '';
  stageid : '';
}

const tabs = [
  { key: "mycustom", title: <Badge text={3}>我的客户</Badge> },
  { key: "wait", title: <Badge text={'今日(20)'}>等待开户</Badge> },
];

@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class Index extends React.Component<ICustomProps,ICustomState> {


  constructor(props: any) {
    super(props);

    this.state = {
      searchValue: '',
      visible: false,
    };
  }

  componentWillMount() {
    this.refresh();
  }

  onSearchValueChange = (value : string) => {
      this.setState({ searchValue : value });
  }

  onSearchValueClear = () => {
      this.setState({ searchValue : '' });
  }

  refresh = () => {
    const account = getAccount();
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/queryCustoms',
      payload: {
        account: account, //'18765',
        stageid: 1,
      },
    });
  }

  onCustomClick = (id : number,name : string, saler :  string) => {
    router.push({
        pathname: "/custom/card",
        state: { 
          customid : id ,
          customname : name,
          saler,
        },
    });
  }

  public render() {
    const { searchValue }  = this.state;
    const { custom } = this.props;
    const { customData } = custom;
    
    const renderData = searchValue === '' ? customData : customData.filter( data => {
        return data.customopcode.includes(searchValue) || data.customname.includes(searchValue);
    });
    

    return (
        <div>
          <TopNavBar title={`客户档案(${customData.length})`} />
          <SearchBar
            value={searchValue}
            placeholder="输入客户操作码或客户名称"
            onClear={this.onSearchValueClear}
            onChange={this.onSearchValueChange}
          />
          
          <List>
              { renderData.map( item => {
                  return (
                    <List.Item key={item.customid} arrow="horizontal" multipleLine onClick={() => this.onCustomClick(item.customid,item.customname,item.salername) }>
                        {item.customname} <List.Item.Brief>{item.salername} <br /> <span style={{ color:'red'}} > 信誉情况: {item.creditinfo}</span></List.Item.Brief>
                    </List.Item>
                  )
                })
              }
          </List>
        </div>
    );
  }
}

export default Index;
