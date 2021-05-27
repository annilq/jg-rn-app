import React from 'react';
import { Dimensions, View } from 'react-native';

const { width: screenWidth } = Dimensions.get("window");

interface Props {
  data: any[];
  rows: number;
  gap?: number
  rowKey?: string;
  renderItem: (any) => React.ReactElement
}

export default (props: Props) => {
  const { rows = 3, gap = 0, renderItem, data = [], rowKey = "id" } = props;
  const gridContainerWidth = screenWidth - (rows + 1) * gap;;

  const gridWidth = gridContainerWidth / rows - 1
  const menuGroup = {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: gap / 2,
    marginRight: gap / 2
  }
  return (
    <View style={menuGroup}>
      {data.map((item, index) => (
        <View
          style={{ width: gridWidth, marginLeft: gap / 2, marginRight: gap / 2 }}
          key={item[rowKey] || index}
        >
          {renderItem(item)}
        </View>
      ))}
    </View>
  );
};