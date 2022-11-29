import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native-ui-lib';
import { iOSUIKit } from 'react-native-typography';

export const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  return (
    <View margin-s2 marginV-s3 paddingH-s3>
      <Text style={iOSUIKit.title3Emphasized}>{title}</Text>

      <View padding-s2>{children}</View>
    </View>
  );
};
