import React from 'react';
import { SearchBar, List } from 'antd-mobile';

import TopNavBar from '@/components/TopNavBar';

import { connect } from 'dva';

import { history } from 'umi';

import { getAccount } from '@/utils/authority';

// const styles = require('./index.less');

interface ICustomData {
  customid: number;
  customopcode: string;
  customname: string;
  salername: string;
  creditinfo?: string;
}

interface ICustomState {
  searchValue: string;
}

interface ICustomProps {
  dispatch?: any;
  loading?: boolean;
  custom: {
    customData: ICustomData[];
  };
  account: '';
  stageid: '';
}

@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class Index extends React.Component<ICustomProps, ICustomState> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  componentWillMount() {
    this.refresh();
  }

  onSearchValueChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  onSearchValueClear = () => {
    this.setState({ searchValue: '' });
  };

  refresh = () => {
    const account = getAccount();
    const { dispatch } = this.props;
    dispatch({
      type: 'custom/queryCustoms',
      payload: {
        account, // '18765',
        stageid: 1,
      },
    });
  };

  onCustomClick = (id: number, name: string, saler: string) => {
    history.push({
      pathname: '/custom/card',
      state: {
        customid: id,
        customname: name,
        saler,
      },
    });
  };

  render() {
    const { searchValue } = this.state;
    const { custom } = this.props;
    const { customData } = custom;

    const renderData =
      searchValue === ''
        ? customData
        : customData.filter(
            data => data.customopcode.includes(searchValue) || data.customname.includes(searchValue)
          );

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
          {renderData.map(item => (
            <List.Item
              key={item.customid}
              arrow="horizontal"
              multipleLine
              onClick={() => this.onCustomClick(item.customid, item.customname, item.salername)}
            >
              {item.customname}{' '}
              <List.Item.Brief>
                {item.salername} <br />{' '}
                <span style={{ color: 'red' }}> 信誉情况: {item.creditinfo}</span>
              </List.Item.Brief>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default Index;
