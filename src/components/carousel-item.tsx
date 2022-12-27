import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { Text, View } from 'react-native-ui-lib';

import { HotelImage } from '../utils/types';

const CarouselItem = ({ item }: { item: HotelImage }) => {
  return (
    <>
      <Image source={{ uri: item.url }} style={styles.image} />
      <View style={{ backgroundColor: 'black' }}>
        <Text marginH-s4 marginV-s2 style={[iOSUIKit.footnoteWhite]}>
          {item.description}
        </Text>
      </View>
    </>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
