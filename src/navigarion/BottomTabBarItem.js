import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {
  HomeActive,
  HomeInactive,
  CartActive,
  CartInactive,
} from '../assets/svgs';
import {THEMES} from '../assets/theme/themes';
import {_Text} from '../components';

const tabBarStyle = {
  height: '100%',
  alignItems: 'center',
  backgroundColor: THEMES.light.colors.white,
  borderTopWidth: 3.5,
  flex: 1 / 2,
  paddingTop: 5,
};

const BottomTabBarItem = ({navigation, state}) => {
  const currentIndex = state.index;
  const {quantity} = useSelector(({cartReducer}) => cartReducer);

  const Tab = ({activeIcon, index, route, label, inActiveIcon, isCart}) => {
    const ActiveIcon = activeIcon;
    const InactiveIcon = inActiveIcon;
    const activeIndex = currentIndex === index;
    return (
      <TouchableOpacity
        style={[
          tabBarStyle,
          {
            borderTopColor: activeIndex
              ? THEMES.light.colors.primary
              : THEMES.light.colors.white,
          },
        ]}
        activeOpacity={activeIndex ? 1 : 0.5}
        onPress={() => navigation.navigate(route)}>
        <View style={styles.iconContainer}>
          {activeIndex ? (
            <ActiveIcon
              width={24}
              height={24}
              fill={THEMES.light.colors.primary}
            />
          ) : (
            <InactiveIcon
              width={24}
              height={24}
              fill={THEMES.light.colors.coolGrey}
              stroke={THEMES.light.colors.coolGrey}
            />
          )}
          {isCart ? (
            <View style={styles.overlayView}>
              <_Text style={styles.overlayText} text={quantity} />
            </View>
          ) : null}
        </View>

        <_Text
          style={[
            styles.tabTextStyle,
            {
              color: activeIndex
                ? THEMES.light.colors.primary
                : THEMES.light.colors.coolGrey,
            },
          ]}
          text={label}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomTabContainer}>
      <Tab
        index={0}
        route="productList"
        label="Home"
        activeIcon={HomeActive}
        inActiveIcon={HomeInactive}
      />
      <Tab
        index={1}
        route="cart"
        label="Cart"
        activeIcon={CartActive}
        inActiveIcon={CartInactive}
        isCart={true}
      />
    </View>
  );
};

export default BottomTabBarItem;

const styles = StyleSheet.create({
  bottomTabContainer: {
    borderTopWidth: 1,
    flexDirection: 'row',
    borderColor: 'transparent',
    shadowColor: THEMES.light.colors.white,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  tabTextStyle: {
    paddingBottom: 10,
    fontFamily: THEMES.light.fontFamily.regular,
    fontSize: THEMES.light.fontSizes[1],
  },
  iconContainer: {
    height: 35,
    justifyContent: 'center',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  overlayView: {
    height: 20,
    width: 20,
    backgroundColor: THEMES.light.colors.secondary,
    borderRadius: 13,
    position: 'absolute',
    top: -5,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontFamily: THEMES.light.fontFamily.regular,
    fontSize: THEMES.light.fontSizes[0],
    color: THEMES.light.colors.primary,
    textAlign: 'center',
  },
});
