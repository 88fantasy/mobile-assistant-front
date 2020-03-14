import React from 'react';

import { connect } from 'dva';

import router from 'umi/router';
import { setAuthority, setAccount } from '@/utils/authority';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = (theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

@connect(({ account, loading }) => ({
  account,
  loading: loading.models.account,
}))
class Index extends React.PureComponent {

  state = {
    username: "",
    password: ""
  }

  onUsernameChange = value => {
    this.setState({
      username: value
    });
  }

  onPasswordChange = value => {
    this.setState({
      password: value
    });
  }

  toLogin = () => {
    const { username, password } = this.state;

    const { dispatch } = this.props;
   

    if (username === "") {
      // to do sth
      // } else if (this.state.password === "") {
      // to do sth
    } else {
      
      dispatch({
        type: 'account/login',
        payload: {
          username,
          stageid: 1,
          pwd : password
        },
      });

      // setAccount(username);
      // setAuthority("admin");
      // router.replace("/");
    }
  }

  public render() {
    const { classes, account } = this.props;
    const { username, password } = this.state;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              移动销售助手
            </Typography>
            <form className={classes.form} noValidate>
            {
              account.accountData.msg && <Alert severity="error">{account.accountData.msg}</Alert>
            }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="用户名"
                name="username"
                autoComplete="username"
                placeholder="请输入员工操作码"
                defaultValue={username}
                autoFocus
                onChange={ e => this.onUsernameChange(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="请输入BMS密码"
                defaultValue={password}
                onChange={e => this.onPasswordChange(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.toLogin}
              >
                登   录
          </Button>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}
export default withStyles(useStyles, { })(Index);