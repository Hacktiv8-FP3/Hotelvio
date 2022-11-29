import React from 'react';
import { View, Text, MarginModifiers } from 'react-native-ui-lib';
import { Bounceable } from 'rn-bounceable';

type Props = MarginModifiers & {
  label?: string;
  onPress?: PureFunc;
};

export const BButton: React.FC<Props> = ({ label, onPress, ...modifiers }) => {
  return (
    <View {...modifiers}>
      <Bounceable onPress={onPress}>
        <View center bg-secondary padding-s3 br50>
          <Text text65M primary>
            {label}
          </Text>
        </View>
      </Bounceable>
    </View>
  );
};
