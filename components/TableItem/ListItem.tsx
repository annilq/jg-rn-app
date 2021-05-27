import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from "./styles"

interface IProps {
  data: any;
  showIndicator?: boolean;
  columns: any[];
  onItemClick?: (params: any) => void;
  children?: any
}

function TableItemCell(props: IProps) {
  const { columns = [], data = {}, onItemClick, children } = props;
  // 默认显示三条
  const defalutColsLength = 5
  const cols = columns.slice(0, defalutColsLength);
  return (
    <TouchableWithoutFeedback onPress={onItemClick}>
      <View
      >
        <View>
          <View
          >
            {cols.map((column, index) => (
              <View
                key={column.title}
                style={styles.listItemContent}
              >
                <Text style={styles.text}>{column.title}:</Text>
                {column.render
                  ? <View>{column.render(data[column.dataIndex], data, index)}</View>
                  : <Text style={styles.text} >{(data[column.dataIndex] || "无数据")}</Text>
                }</View>
            ))}
          </View>
          {/* <View> {children}</View> */}
        </View>
        <View
          style={styles.footer}
        >
          <Text style={styles.text}>创建人: {data.creatorName || '无'}</Text>
          <Text style={styles.text}>创建时间:{data.createTime || '无'}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TableItemCell;
