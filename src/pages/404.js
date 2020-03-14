import React from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import Exception from '@/components/Exception';


export default class extends React.PureComponent {

  render() {
    return (
      <Exception type="404" linkElement={Link} desc="抱歉，你访问的页面不存在" backText="返回首页" />
    ) 
  }
}
