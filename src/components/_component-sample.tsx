import React from 'react';
import { Text, View } from 'react-native-ui-lib';

type Props = {
  title?: string;
};

export const ExampleComponent: React.FC<Props> = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
