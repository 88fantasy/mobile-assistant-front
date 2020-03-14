import React, { Component } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles, createStyles, Theme, styled } from '@material-ui/core/styles';

import router from 'umi/router';

const useStyles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#fff'
  },
});

const CustomAppBar = styled(AppBar)({
  background: '#2196f3',
});


interface ITopNavBarProps {
  title : string;
  rightContent?: any;
  classes?: any;
}

@withStyles(useStyles)
class TopNavBar extends Component<ITopNavBarProps> {

    static defaultProps={
        title: "导航栏"
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
      const { title, rightContent, classes } = this.props;

      return (
        <div className={classes.root}>
          <CustomAppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => router.goBack()}>
              <ArrowBackIcon />
            </IconButton>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              {rightContent}
            </Toolbar>
          </CustomAppBar>
        </div>
      );
    }
  }
  
  export default TopNavBar;