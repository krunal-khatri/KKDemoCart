import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {THEMES} from '../../../assets/theme/themes';

const Splash = props => {
  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
    const {navigation} = props;
    setTimeout(() => {
      navigation.navigate('dashboard');
    }, 1500);
  };

  return (
    <View style={styles.root}>
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/logo.png')}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEMES.light.colors.primary,
  },
});
