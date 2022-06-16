import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import {Header, ProductCard} from '../../../components';
import {THEMES} from '../../../assets/theme/themes';
import {DUMMY_DATA} from '../../../constants/constants';

const {light} = THEMES;

const Home = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(DUMMY_DATA);
  }, [isFocused]);

  const renderItem = ({item}) => {
    return <ProductCard item={item} isFocused={isFocused} />;
  };

  return (
    <View style={styles.root}>
      <Header title={'Home'} />
      <FlatList
        data={data}
        keyExtractor={(it, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {backgroundColor: THEMES.light.colors.antiWhite},
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: light.spacer[3],
    paddingTop: light.spacer[7],
    paddingBottom: light.spacer[20],
  },
});
