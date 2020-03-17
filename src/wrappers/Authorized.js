import React from 'react';
import { Redirect } from 'umi';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

export default ({ children }) => {
  const Authority = getAuthority();
  const Authorized = RenderAuthorized(Authority);
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/login" />}>
      {children}
    </Authorized>
  );
};
