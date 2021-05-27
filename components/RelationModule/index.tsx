import React from 'react';
import { Tabs,Badge } from 'antd';
import { relation as api } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import RelateDetail from './detail';

const { TabPane } = Tabs;

interface IProps {
  domainFormCode: string;
  domainId: string;
}

interface ModuleInte extends IProps {
  domainFormName: string;
  relateFormCode: string;
  count: number;
}

function RelationModule(props: IProps) {
  const { domainFormCode, domainId } = props;
  const { data = [] } = useFetch<ModuleInte[]>(api.getRelateMenuList, { domainFormCode, domainId });

  if (!data || data.length === 0) {
    return (
      <div style={{ lineHeight: '70px', textAlign: 'center', backgroundColor: '#fff' }}>
        暂无关联模块
      </div>
    );
  }
  const modulitems = data.map(item => (
    <TabPane
      tab={<Badge count={item.count} offset={[10, 0]}>{item.domainFormName}</Badge>}
      // tab={item.domainFormName}
      key={item.relateFormCode}
    >
      <RelateDetail data={item} domainFormCode={domainFormCode} />
    </TabPane>
  ));
  return <Tabs tabBarStyle={{ backgroundColor: '#fff', padding: '0 10px', height: 40, marginBottom: 10 }}>{modulitems}</Tabs>;
}
export default RelationModule;
