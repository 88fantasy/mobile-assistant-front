import React from 'react';

import { Grid, Modal } from 'antd-mobile';

import { history } from 'umi';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import { withStyles, createStyles, Theme, styled } from '@material-ui/core/styles';

// const styles = require('./index.less');

const funcs = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="75"
        height="75"
        viewBox="0 0 24 24"
        fill="#569ac4"
      >
        <path d="M24 22h-24v-15h24v15zm-15-20c-1.104 0-2 .896-2 2v2h2v-1.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6z" />
      </svg>
    ),
    text: '客户档案',
    detail: '客户及联系人管理',
    path: '/custom',
  },
  // {
  //   icon: <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="#fdc645"><path d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"/></svg>,
  //   text: '分析报表',
  //   detail: '最新最全数据报表',
  //   path: '/analysis',
  // }
];

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: '#fff',
    },
  });

const CustomAppBar = styled(AppBar)({
  background: '#2196f3',
});

@withStyles(useStyles)
class Index extends React.Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      showVersion: false,
    };
  }

  onFuncClick = (el: any) => {
    // let data = JSON.stringify(this.props.data)
    const path = `${el.path}`;
    history.push(path);
  };

  onVersionModalShow = e => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      showVersion: true,
    });
  };

  onVersionModalClose = () => {
    this.setState({
      showVersion: false,
    });
  };

  render = () => {
    const { showVersion } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <CustomAppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                移动销售助手
              </Typography>
              <Button color="inherit" onClick={this.onVersionModalShow}>
                v20200206
              </Button>
            </Toolbar>
          </CustomAppBar>
        </div>

        <Grid
          data={funcs}
          columnNum={2}
          renderItem={dataItem => (
            <div style={{ padding: '12.5px' }}>
              {dataItem.icon}
              <div style={{ color: '#888', fontSize: '16px', marginTop: '12px' }}>
                <span>{dataItem.text}</span>
              </div>
              <div style={{ color: '#888', fontSize: '12px', marginTop: '12px' }}>
                <span>{dataItem.detail}</span>
              </div>
            </div>
          )}
          onClick={this.onFuncClick}
        />

        <Modal
          visible={showVersion}
          transparent
          maskClosable={false}
          onClose={this.onVersionModalClose}
          title="版本信息"
          footer={[
            {
              text: 'Ok',
              onPress: () => {
                this.onVersionModalClose();
              },
            },
          ]}
        >
          <div style={{ textAlign: 'left' }}>
            <p>发布日期: 2020-03-17</p>
            <p>本次更新增加 销售冲收查询</p>
            <p>
              历史版本信息请查看{' '}
              <a
                href="https://github.com/88fantasy/mobile-assistant-front/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                这里
              </a>
            </p>
          </div>
        </Modal>
      </div>
    );
  };
}
export default Index;
