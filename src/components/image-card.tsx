import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, TouchableOpacity } from 'react-native-ui-lib';

export const ImageCard = () => {
  return (
    <TouchableOpacity style={[styles.card, styles.elevation]}>
      <View style={styles['image-container']}>
        <Image
          source={require('../images/background.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>Bali</Text>
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
    shadowColor: '#52006A',
  },
  text: {
    paddingVertical: 5,
    textAlign: 'center',
    color: 'black',
  },
});
