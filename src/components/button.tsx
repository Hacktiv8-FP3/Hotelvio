import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { Text, MarginModifiers, View } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';
import { colors } from '../utils/color';

type Props = MarginModifiers & {
  onPress?: PureFunc;
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  ...modifiers
}) => {
  return (
    <View {...modifiers}>
      <Bounceable onPress={onPress}>
        <View center bg-secondary padding-s3 marginV-s2 br50>
          <Text style={[iOSUIKit.subheadEmphasized, style.color]}>
            {children}
          </Text>
        </View>
      </Bounceable>
    </View>
  );
};

const style = StyleSheet.create({
  color: {
    color: colors.blue,
  },
});
