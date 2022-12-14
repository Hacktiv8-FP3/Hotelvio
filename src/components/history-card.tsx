import React from 'react';
import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { Image, Text, View } from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '../components/button';
import { screens } from '../screens';
import { colors } from '../utils/color';
import { History } from '../utils/types';

export const HistoryCard = ({
  data,
  componentId,
}: {
  data: History;
  componentId: string;
}) => {
  const push = () => {
    screens.push(componentId, 'HistoryDetail', {
      data,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles['image-container']}>
        <Image source={{ uri: data.hotel.image }} style={styles.image} />
        <Text style={{ ...(iOSUIKit.bodyEmphasized as {}), ...styles.text }}>
          {data.hotel.name}
        </Text>
        <Text
          style={{
            ...(iOSUIKit.subhead as {}),
            marginTop: 5,
            color: '#5a5a5a',
            paddingLeft: 10,
          }}
        >
          Booking date : {data.bookDate.toLocaleDateString()}
        </Text>
        <View
          style={{
            ...styles.text,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name='nature-people'
            size={25}
            color={colors.blue}
          />
          <Text style={{ ...(iOSUIKit.callout as {}), marginLeft: 10 }}>
            1 room, 2 Adult
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Button onPress={push}>Details</Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',

    height: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
  },
  'image-container': {
    width: '97%',

    height: 300,
    borderColor: colors.blue,
    marginBottom: 10,
    borderRadius: 2,
    shadowColor: colors.blue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,

    elevation: 3,
  },
  text: {
    paddingTop: 10,
    paddingLeft: 10,
  },
});
