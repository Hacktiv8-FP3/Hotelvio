import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
};

export const DateTimePickerInput: React.FC<Props> = ({ title }) => {
  return (
    <View row>
      <View marginR-10>
        <MaterialIcons name='date-range' size={20} />
      </View>
      <Text dark10>{title}</Text>
    </View>
  );
};
