import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import { getIconConfigFormPath } from '@/routerConfig';
import GridList from '@/components/Grid';

import styles from "./styles"
export default (props) => {
  const { data, handleClick } = props
  return (
    <View style={styles.flowGroup}>
      <Text style={styles.menuTitle}>{data.menuName}</Text>
      <GridList data={data.children} rows={3} gap={20} renderItem={
        (item) => {
          const uri = getIconConfigFormPath(item.url);
          return (
            <TouchableWithoutFeedback onPress={() => handleClick(item)}>
              <View
                style={styles.menuGroupItem}
              >
                <View>
                  <Image source={uri} style={styles.menuIcon} />
                  <View style={styles.menuMoreIcon}>
                    {item.children.length > 0 && <Icon name="right" type="antdesign" size={12} />}
                  </View>
                </View>
                <Text>{item.menuName}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }
      } />
    </View>
  );
};