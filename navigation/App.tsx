import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import LoginScreen from '../screens/LoginScreen';
import WorkScreen from '../screens/Work';
import FlowList from '../screens/FlowList';

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AppStack = createStackNavigator();

export default function LoginNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'login' }}
      />
      <AppStack.Screen
        name="WorkScreen"
        component={WorkScreen}
      />
      <AppStack.Screen
        name="FlowListScreen"
        component={FlowList}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </AppStack.Navigator>
  );
}
