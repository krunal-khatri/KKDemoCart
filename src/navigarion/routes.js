import React, {useEffect} from 'react';
import {Alert, BackHandler, Platform} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {goBack, navigationRef} from './rootNavigationRef';
import Splash from '../features/splash/screen/splash';
import BottomTabNavigation from './bottomTabNavigation';
import {ProductDetail} from '../features/productDetail/screen';

const Stack = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
  gestureEnabled: false,
});

const exitRouteList = ['dashboard'];

export default function Routes(props) {
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
    <NavigationContainer
      ref={navigationRef}
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false,
        }}>
        <Stack.Screen
          name="splash"
          component={Splash}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="dashboard"
          component={BottomTabNavigation}
          initialParams={props.route}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="detail"
          component={ProductDetail}
          initialParams={props.route}
          options={navOptionHandler}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
