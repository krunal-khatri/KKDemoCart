import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTabBarItem from './BottomTabBarItem';

import {Home} from '../features/home/screen';
import {Cart} from '../features/cart/screen';
import {Alert, BackHandler, Platform} from 'react-native';
import {goBack, navigationRef} from './rootNavigationRef';

const Tab = createBottomTabNavigator();
const exitRouteList = ['productList'];
const navOptionHandler = () => ({
  headerShown: false,
  gestureEnabled: false,
});

export default function BottomTabNavigation() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', function () {
        const scene = navigationRef.current.getCurrentRoute().name;
        if (exitRouteList.includes(scene)) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit?',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {text: 'Exit', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
          );
          return true;
        }
        goBack();
        return true;
      });
    }
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="productList"
      tabBar={props => <BottomTabBarItem {...props} />}>
      <Tab.Screen
        name="productList"
        component={Home}
        options={navOptionHandler}
      />
      <Tab.Screen name="cart" component={Cart} options={navOptionHandler} />
    </Tab.Navigator>
  );
}
