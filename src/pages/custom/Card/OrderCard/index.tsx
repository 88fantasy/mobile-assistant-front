import React, { Component } from 'react';

import { SearchBar, List, Card, WhiteSpace, Calendar } from 'antd-mobile';

import { makeStyles } from '@material-ui/core/styles';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import MaterList from '@material-ui/core/List';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import moment from 'moment';

import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

import { connect } from 'dva';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const OrderExpansionPanels = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = props;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {data.map(row => (
        <ExpansionPanel
          expanded={expanded === `panel${row.salesdtlid}`}
          onChange={handleChange(`panel${row.salesdtlid}`)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${row.salesdtlid}-content`}
            id={`panel${row.salesdtlid}-header`}
          >
            <Typography className={classes.heading}>{row.saledate}</Typography>
            <Typography className={classes.secondaryHeading}>
              {row.productname}*{row.qty}={row.total}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <MaterList component="nav">
              <ListItem>
                <ListItemText primary={`操作码:${row.productcode}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`规格:${row.goodstype}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`产地:${row.prodarea}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`单价:${row.unitprice}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`销售细单:${row.salesdtlid}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`订单状态:${row.sostatus}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`作业状态:${row.attemperstatus}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`批号:${row.lotno}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`波次:${row.shipdate}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`地址:${row.address}`} />
              </ListItem>
            </MaterList>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

interface IOrderCardProps {
  cid: string;
  dispatch?: any;
  loading?: boolean;
  custom?: any;
}

interface IOrderCardState {
  searchValue: string;
  searchStartDate: string;
  searchEndDate: string;
  searchString: string;
  show: boolean;
}

@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class OrderCard extends Component<IOrderCardProps, IOrderCardState> {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      searchStartDate: '',
      searchEndDate: '',
      searchString: '',
      show: false,
    };

    this.toSearch = this.toSearch.bind(this);
  }

  componentWillUnmount() {
    const { custom } = this.props;
    custom.orderData = [];
  }

  onDateConfirm = (startTime, endTime) => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    const searchStartDate = moment(startTime).format('YYYY-MM-DD');
    const searchEndDate = moment(endTime).format('YYYY-MM-DD');
    this.setState({
      show: false,
      searchStartDate,
      searchEndDate,
      searchString: `${searchStartDate} 至 ${searchEndDate}`,
    });
  };

  onDateCancel = () => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      searchStartDate: '',
      searchEndDate: '',
    });
  };

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
      const { searchStartDate, searchEndDate } = this.state;
      dispatch({
        type: 'custom/queryOrders',
        payload: {
          customid: cid,
          productcode: value,
          startdate: searchStartDate,
          enddate: searchEndDate,
          stageid: 1,
        },
      });
    }
  };

  render() {
    const now = new Date();
    const { searchValue, show, searchString } = this.state;
    const { custom } = this.props;
    const { orderData } = custom;
    const { toSearch } = this;

    return (
      <div>
        <List>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
              });
            }}
          >
            {`请选择日期 :  ${searchString}`}
          </List.Item>
        </List>
        <SearchBar
          value={searchValue}
          placeholder="货品操作码,货品名称"
          onChange={this.onSearchValueChange}
          onClear={this.onSearchValueClear}
          onSubmit={toSearch}
        />
        {orderData.length === 0 && (
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
        <WhiteSpace size="xl" />
        <OrderExpansionPanels data={orderData} />

        <Calendar
          locale={zhCN}
          visible={show}
          showShortcut
          onCancel={this.onDateCancel}
          onConfirm={this.onDateConfirm}
          defaultDate={now}
          minDate={new Date(+now - 31536000000)}
          maxDate={new Date(+now + 2592000000)}
        />
      </div>
    );
  }
}

export default OrderCard;
