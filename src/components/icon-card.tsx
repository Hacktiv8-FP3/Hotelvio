import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import { colors } from '../utils/color';

export const IconCard: React.FC<PropsWithChildren<{ text: string }>> = ({
  children,
  text,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles['child-container']}>{children}</View>
      <Text>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  'child-container': {
    minWidth: 60,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grayBorder,
    borderWidth: 1.5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});
