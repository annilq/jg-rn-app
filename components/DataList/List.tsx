import React from 'react';
import { ScrollView, View } from 'react-native';
interface Iprops {
  dataSource: any[];
  renderItem: (data: any, index: number) => React.ReactElement;
  rowKey: string
}
const List = (props: Iprops) => {
  const { dataSource, renderItem } = props
  return (
    <ScrollView>
      {dataSource.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};
List.Item = View
export default List