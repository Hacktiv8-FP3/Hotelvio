import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../utils/color';

export const StarRate: React.FC<{ star: number; style?: {} }> = ({
  star,
  style,
}) => {
  const collect: Array<'yellow' | 'gray'> = [];
  for (let i = 0; i < 5; i++) {
    star <= i ? collect.push('gray') : collect.push('yellow');
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
      <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 10 }}>
        {star}
      </Text>
      {collect.map((item, index) => (
        <MaterialIcon
          key={`star-${index}`}
          name='star'
          size={20}
          color={colors[item]}
        />
      ))}
    </View>
  );
};
