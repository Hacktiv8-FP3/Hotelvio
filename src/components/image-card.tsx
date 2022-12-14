import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';

import { colors } from '../utils/color';

interface Props {
  text?: string;
  onPress?: () => void;
  active: Boolean;
}
export const ImageCard = ({ text = 'Bali', onPress, active }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.card, styles.elevation, active && styles.active]}
      onPress={onPress}
    >
      <View style={styles['image-container']}>
        <Image
          source={require('../images/background.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  'image-container': {
    width: 100,
    height: 105,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginRight: 10,
    paddingBottom: 8,
    marginBottom: 3,
  },
  elevation: {
    elevation: 4,
    alignSelf: 'flex-start',
    shadowColor: colors.blue,
  },
  text: {
    paddingVertical: 5,
    textAlign: 'center',
    color: 'black',
  },
  active: {
    backgroundColor: colors.grayBorder,
  },
});
