import React, { Component } from 'react'

import {
    SearchBar
}  from 'antd-mobile';

import { makeStyles } from '@material-ui/core/styles';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import moment from 'moment';


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

const ArrearExpansionPanels = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = props;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {
        data.map(row => {
          return (
            <ExpansionPanel expanded={expanded === `panel${row.salesid}`} onChange={handleChange(`panel${row.salesid}`)}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${row.salesid}-content`}
                id={`panel${row.salesid}-header`}
              >
                <Typography className={classes.heading}>{row.saledate}</Typography>
                <Typography className={classes.secondaryHeading}>销售单:{row.salesid},欠款:{row.arrear},{row.signforid? `签收单:${row.signforid}` : `未发货` }</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {
                  row.invs.map ( inv => {
                    return (
                      <List component="nav" >
                        <ListItem>
                          <ListItemText primary={`发票号:${inv.invno}   (${inv.invdate})`} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary={`发票金额:${inv.total}`} />
                        </ListItem>
                        <Divider />
                        {
                          inv.goods.map ( good => {
                            return (
                              <ListItem>
                                <ListItemText primary={good} />
                              </ListItem>
                            )
                          })
                        }
                      </List>
                    )
                  })
                }
               
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
}


@connect(({ custom, loading }) => ({
  custom,
  loading: loading.models.custom,
}))
class ArrearCard extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      searchValue : "",
    }

  }

  componentWillMount() {
    this.refreshData();
  }

  onSearchValueChange = (value) => {
    this.setState({ searchValue : value });
  }

  onSearchValueClear = () => {
      this.setState({ searchValue : '' });
  }

  refreshData = () => {
    const { dispatch, cid } = this.props;
    dispatch({
      type: 'custom/queryArrears',
      payload: {
        customid : cid,
        stageid: 1,
      },
    });
  }
  
  render(){
    const { searchValue } = this.state;
    const { custom } = this.props;
    const { arrearData } = custom;
    const { toSearch } = this;

    const renderData = searchValue === '' ? arrearData : arrearData.filter( data => {
        return (data.signforid && data.signforid.includes(searchValue) ) || data.invs.filter( inv => {
          return inv.invno.includes(searchValue) || inv.goods.filter( good => {
            return good.includes(searchValue);
          }).length > 0;
        }).length > 0;
    });
    
    return(
      <div>
        <SearchBar
          value={searchValue}
          placeholder="签收单id,发票号,货品操作码,货品名称"
          onChange={this.onSearchValueChange}
          onClear={this.onSearchValueClear}
          onSubmit={toSearch}
        />
        
        <ArrearExpansionPanels data={renderData}/>
      </div>
       
    )
  }
}

export default ArrearCard;