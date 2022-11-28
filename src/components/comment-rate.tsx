import React from 'react';
import { Avatar, Text, View } from 'react-native-ui-lib';
import { colors } from '../utils/color';

export const CommentRate: React.FC<{ comment?: string }> = ({ comment }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        borderBottomColor: colors.grayBorder,
        paddingBottom: 10,
        borderBottomWidth: 1,
      }}
    >
      <Avatar
        source={{
          uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
        }}
        size={50}
      />
      <Text style={{ flexWrap: 'wrap', width: '80%', marginLeft: 10 }}>
        {comment}
      </Text>
    </View>
  );
};
