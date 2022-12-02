import React, { PropsWithChildren } from 'react';
import { iOSUIKit } from 'react-native-typography';
import { Text, View } from 'react-native-ui-lib';

export const Section: React.FC<
  PropsWithChildren<{
    title?: string;
  }>
> = ({ children, title }) => {
  return (
    <View margin-s2 marginV-s3 paddingH-s3>
      {title && <Text style={iOSUIKit.title3Emphasized}>{title}</Text>}

      <View padding-s2>{children}</View>
    </View>
  );
};
