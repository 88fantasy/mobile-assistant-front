import React, { Component } from 'react';

import { List, Card, WhiteSpace, Calendar } from 'antd-mobile';

import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline,
  Container,
  Card as MaterCard,
  CardContent,
  Typography,
  List as MaterList,
  ListItem,
} from '@material-ui/core';

import moment from 'moment';

import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

import { connect } from 'dva';

interface IReceivesCardProp {
  cid: string;
  dispatch?: any;
  loading?: boolean;
  custom?: any;
}

interface IReceivesCardState {
  showCredate: boolean;
  showRatime: boolean;
  creStartDate: string;
  creEndDate: string;
  searchCredateString: string;
  raStartDate: string;
  raEndDate: string;
  searchRatimeString: string;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const ReceiveCard = props => {
  const classes = useStyles();
  const { data } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <MaterList component="nav">
          {data.map(row => (
            <ListItem>
              <MaterCard className={classes.root} key={row.serialNumber}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    收款单ID{bull} {row.recid}
                  </Typography>
                  <Typography variant="h5" component="h4">
                    收款时间{bull} {row.credate}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    财务时间{bull} {row.ratime}
                  </Typography>
                  <Typography variant="h6" component="p" color="secondary">
                    收款金额{bull} {row.total}
                  </Typography>
                </CardContent>
              </MaterCard>
            </ListItem>
          ))}
        </MaterList>
      </Container>
    </React.Fragment>
  );
};

@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class ReceivesCard extends Component<IReceivesCardProp, IReceivesCardState> {
  constructor(props) {
    super(props);

    this.state = {
      showCredate: false,
      showRatime: false,
      creStartDate: moment()
        .add(-6, 'day')
        .format('YYYY-MM-DD'),
      creEndDate: moment()
        .add(1, 'day')
        .format('YYYY-MM-DD'),
      searchCredateString: `${moment()
        .add(-6, 'day')
        .format('YYYY-MM-DD')} 至 ${moment()
        .add(1, 'day')
        .format('YYYY-MM-DD')}`,
      raStartDate: '',
      raEndDate: '',
      searchRatimeString: '',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    const { custom } = this.props;
    custom.receiveData = [];
  }

  refreshData = () => {
    const { dispatch, cid } = this.props;
    const { creStartDate, creEndDate, raStartDate, raEndDate } = this.state;

    dispatch({
      type: 'custom/queryReceives',
      payload: {
        customid: cid,
        stageid: 1,
        type: raStartDate === '' ? 'CREDATE' : 'RATIME',
        startdate: raStartDate === '' ? creStartDate : raStartDate,
        enddate: raStartDate === '' ? creEndDate : raEndDate,
      },
    });
  };

  onDateConfirm = (type, startTime, endTime) => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    const searchStartDate = moment(startTime).format('YYYY-MM-DD');
    const searchEndDate = moment(endTime).format('YYYY-MM-DD');
    if (type === 'credate') {
      this.setState({
        showCredate: false,
        creStartDate: searchStartDate,
        creEndDate: searchEndDate,
        searchCredateString: `${searchStartDate} 至 ${searchEndDate}`,
      });
    } else if (type === 'ratime') {
      this.setState({
        showRatime: false,
        raStartDate: searchStartDate,
        raEndDate: searchEndDate,
        searchRatimeString: `${searchStartDate} 至 ${searchEndDate}`,
      });
    }
    this.refreshData();
  };

  onDateCancel = type => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    if (type === 'credate') {
      this.setState({
        showCredate: false,
        creStartDate: '',
        creEndDate: '',
        searchCredateString: '',
      });
    } else if (type === 'ratime') {
      this.setState({
        showRatime: false,
        raStartDate: '',
        raEndDate: '',
        searchRatimeString: '',
      });
    }
  };

  render() {
    const now = new Date();

    const { showCredate, showRatime, searchCredateString, searchRatimeString } = this.state;

    const { custom } = this.props;
    const { receiveData } = custom;

    return (
      <div>
        <List>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                showCredate: true,
              });
            }}
          >
            {`收款日期 :  ${searchCredateString}`}
          </List.Item>
          <List.Item
            arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                showRatime: true,
              });
            }}
          >
            {`财务日期 :  ${searchRatimeString}`}
          </List.Item>
        </List>
        {receiveData.length === 0 && (
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
        <ReceiveCard data={receiveData} />

        <Calendar
          locale={zhCN}
          visible={showCredate}
          showShortcut
          onCancel={() => this.onDateCancel('credate')}
          onConfirm={(startTime, endTime) => this.onDateConfirm('credate', startTime, endTime)}
          defaultDate={now}
          minDate={new Date(+now - 31536000000)}
          maxDate={new Date(+now + 2592000000)}
        />

        <Calendar
          locale={zhCN}
          visible={showRatime}
          showShortcut
          onCancel={() => this.onDateCancel('ratime')}
          onConfirm={(startTime, endTime) => this.onDateConfirm('ratime', startTime, endTime)}
          defaultDate={now}
          minDate={new Date(+now - 31536000000)}
          maxDate={new Date(+now + 2592000000)}
        />
      </div>
    );
  }
}

export default ReceivesCard;
