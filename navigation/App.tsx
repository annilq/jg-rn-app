import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import LoginScreen from '../screens/LoginScreen';
import WorkScreen from '../screens/Work';
import FlowList from '../screens/FlowList';
import DetailScreen from '../screens/DetailScreen';

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AppStack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: '登录页面' }}
      />
      <AppStack.Screen
        name="WorkScreen"
        component={WorkScreen}
      />
      <AppStack.Screen
        name="FlowListScreen"
        component={FlowList}
        options={{ headerTitle: '列表页面' }}
      />
      <AppStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerTitle: '详情页面' }}
      />
    </AppStack.Navigator>
  );
}
