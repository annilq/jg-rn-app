import React from 'react';

// import { useDetailCom } from '@/hooks/useDetailCom';
// import { getConfigFormFormCode } from '@/components/CustomForm/routerConfig'
import Detail from '@/components/CustomForm/detail/combine';

interface IProps {
  formCode: string;
  [index: string]: any;
}

function DetailPage(props: IProps) {
  const { formCode, ...rest } = props;
  // const curRouter = getConfigFormFormCode(formCode);
  // console.log(curRouter);
  // const { component: Component } = useDetailCom(curRouter.componentPath);
  // if (!Component) {
  //   return false
  // }
  console.log(formCode);
  return (
    <Detail formCode={formCode} {...rest} />
  );
}

export default DetailPage;
