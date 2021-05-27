import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

import { BottomSheet } from 'react-native-elements';
import FlowGroup from './flowGroup';
import styles from './styles';

export default () => {
  const [menus, setMenus] = useState([])
  const [show, setShow] = useState(false);
  const [subMenu, setSubMenu] = useState({ children: [] });
  const navigation = useNavigation();
  useEffect(
    () => {
      AsyncStorage.getItem('menu').then(menus => setMenus(JSON.parse(menus || "") || []));
    }, []
  );

  function goApprove() {
    navigation.navigate("work", {
      url: '/pages/work/index',
    })
  }

  function goTask() {

  }

  function addFlow() {
  }

  function goFlowList(flow) {
    console.log(flow.url);
    navigation.navigate("FlowListScreen", {
      path: flow.url
    })
  }

  function handleClick(flow) {    
    if (flow.children.length > 0) {
      setShow(true);
      setSubMenu(flow)
    } else {
      goFlowList(flow)
    }
  }
  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.headerMenuItem} onPress={goApprove}>
          <Icon type="antdesign" name="profile" size={36} color="#fff" />
          <Text style={styles.headerText}>待我审批</Text>
        </View>
        <View style={styles.headerMenuItem} onPress={goTask}>
          <Icon type="antdesign" name="mail" size={36} color="#fff" />
          <Text style={styles.headerText}>任务</Text>
        </View>
        <View style={styles.headerMenuItem} onPress={addFlow}>
          <Icon type="antdesign" name="edit" size={36} color="#fff" />
          <Text style={styles.headerText}>新建流程</Text>
        </View>
      </View>
      <View>
        {menus.map((menuItem) => (
          <FlowGroup data={menuItem} handleClick={handleClick} key={menuItem.menuCode}/>
        ))}
      </View>
      <BottomSheet
        isVisible={show}
      >
        <View>
          <FlowGroup data={subMenu} handleClick={handleClick} />
        </View>
      </BottomSheet>
    </ScrollView>
  );
};
