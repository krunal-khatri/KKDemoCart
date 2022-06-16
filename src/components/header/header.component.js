import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {THEMES} from '../../assets/theme/themes';
import {_Text} from '../text';
import {NavigationBack} from '../../assets/svgs';

export default function Header({title, right, isback}) {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(THEMES.light.colors.primary);
      StatusBar.setBarStyle('light-content');
    }
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        backgroundColor={THEMES.light.colors.primary}
        barStyle="light-content"
      />
      <View style={styles.row}>
        {isback ? (
          <TouchableOpacity
            onPress={isback ? navigation.goBack : navigation.toggleDrawer}
            style={styles.backContainer}>
            <NavigationBack
              height={28}
              width={28}
              color={THEMES.light.colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.backContainer} />
        )}
        <View style={styles.textContainer}>
          <_Text style={styles.headerTitle} numberOfLines={1} text={title} />
        </View>
        {right}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: THEMES.light.colors.primary,
    minHeight: 50,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: THEMES.light.colors.white,
    fontSize: THEMES.light.fontSizes[3],
    fontFamily: THEMES.light.fontFamily.regular,
  },
  backContainer: {paddingHorizontal: 15, paddingVertical: 5},
  textContainer: {flex: 1, marginHorizontal: 5},
});
