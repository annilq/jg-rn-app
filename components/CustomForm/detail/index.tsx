import React from 'react';

import { getRouterConfig } from '@/models/menu';

import { useDetailCom } from '@/hooks/useDetailCom';

interface IProps {
  formCode: string;
  [index: string]: any;
}

function DetailPage(props: IProps) {
  const { formCode, route, ...rest } = props;
  const curRouter = route || getRouterConfig({ formCode });
  const { component: Component } = useDetailCom(curRouter.componentPath);
  if (!Component) {
    return false
  }
  return (
    <Component formCode={formCode} {...rest} />
  );
}

export default DetailPage;
