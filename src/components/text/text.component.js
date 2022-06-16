import React from 'react';
import {Text} from 'react-native';

function _Text({
  text,
  style,
  numberOfLines,
  allowFontScaling = false,
  adjustsFontSizeToFit = false,
}) {
  return (
    <Text
      style={style}
      numberOfLines={numberOfLines}
      ellipsizeMode={'tail'}
      allowFontScaling={allowFontScaling}
      adjustsFontSizeToFit={adjustsFontSizeToFit}>
      {text}
    </Text>
  );
}

export default _Text;
