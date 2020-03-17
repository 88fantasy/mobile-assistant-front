import React, { Component } from 'react';

import { SearchBar, Card } from 'antd-mobile';

import MaterCard from '@material-ui/core/Card';

import {
  CardHeader,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'dva';

interface IGoodsCardProp {
  cid: string;
  dispatch?: any;
  custom?: any;
}

interface IGoodsCardState {
  searchValue: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProductCard = props => {
  const classes = useStyles();
  const { data } = props;

  return (
    <div className={classes.root}>
      {data.map(row => (
        <Paper elevation={3}>
          <MaterCard>
            <CardHeader title={row.productname} subheader={row.productcode} />
            <CardContent>
              <List>
                <ListItem key={`item-${row.productcode}-goodstype`}>
                  <ListItemText id={`${row.productcode}-goodstype`} primary="规格" />
                  <ListItemSecondaryAction>{row.goodstype}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-factname`}>
                  <ListItemText id={`${row.productcode}-factname`} primary="厂家" />
                  <ListItemSecondaryAction>{row.factname}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-jhy`}>
                  <ListItemText id={`${row.productcode}-jhy`} primary="计划员" />
                  <ListItemSecondaryAction>{row.jhy}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-cgy`}>
                  <ListItemText id={`${row.productcode}-cgy`} primary="采购员" />
                  <ListItemSecondaryAction>{row.cgy}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-unitprice`}>
                  <ListItemText id={`${row.productcode}-unitprice`} primary="基价" />
                  <ListItemSecondaryAction>{row.unitprice}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-lastprice`}>
                  <ListItemText id={`${row.productcode}-lastprice`} primary="最近开票价" />
                  <ListItemSecondaryAction>{row.lastprice}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-stqty`}>
                  <ListItemText id={`${row.productcode}-stqty`} primary="可开数" />
                  <ListItemSecondaryAction>{row.stqty}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-goodsqty`}>
                  <ListItemText id={`${row.productcode}-goodsqty`} primary="库存数" />
                  <ListItemSecondaryAction>{row.goodsqty}</ListItemSecondaryAction>
                </ListItem>
                <Divider light />
                <ListItem key={`item-${row.productcode}-lsj`}>
                  <ListItemText id={`${row.productcode}-lsj`} primary="零售价" />
                  <ListItemSecondaryAction>{row.lsj}</ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </MaterCard>
        </Paper>
      ))}
    </div>
  );
};

@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class GoodsCard extends Component<IGoodsCardProp, IGoodsCardState> {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };

    this.toSearch = this.toSearch.bind(this);
  }

  componentWillUnmount() {
    const { custom } = this.props;
    custom.productData = [];
  }

  onSearchValueChange = value => {
    this.setState({ searchValue: value });
  };

  onSearchValueClear = () => {
    this.setState({ searchValue: '' });
  };

  toSearch = value => {
    if (value === '') {
      // to do sth
    } else {
      const { dispatch, cid } = this.props;
      dispatch({
        type: 'custom/queryProducts',
        payload: {
          customid: cid,
          productcode: value,
          stageid: 1,
        },
      });
    }
  };

  render() {
    const { searchValue } = this.state;
    const { custom } = this.props;
    const { productData } = custom;
    const { toSearch } = this;
    return (
      <div>
        <SearchBar
          value={searchValue}
          placeholder="货品操作码,货品名称"
          onChange={this.onSearchValueChange}
          onClear={this.onSearchValueClear}
          onSubmit={toSearch}
        />
        {productData.length === 0 && (
          <Card>
            <Card.Body>
              <div>
                <p style={{ textAlign: 'center' }}>
                  <span>操作提示</span>
                </p>
                <p style={{ textAlign: 'center' }}>
                  <span>请尽量缩小查询范围,以免涉及品种过多导致查询超时</span>
                </p>
              </div>
            </Card.Body>
          </Card>
        )}
        <ProductCard data={productData} />
      </div>
    );
  }
}

export default GoodsCard;
