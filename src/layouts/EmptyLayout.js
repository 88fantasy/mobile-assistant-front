import React from 'react';
// import styles from './EmptyLayout.less';

class UserLayout extends React.PureComponent {

  render() {
    const { children } = this.props;
    return (
      
      <div>
        {children}
      </div>
    );
  }
}

export default UserLayout;
