import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View, TouchableOpacity } from 'react-native-ui-lib';
// import { screens } from '../screens';
// import { Props as SampleProps } from './_screen-sample';
import { colors } from '../utils/color';

export const HotelCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <TouchableOpacity style={[styles.container, styles.elevation]}>
      <Image
        source={require('../images/background2.jpg')}
        style={styles.image}
      />
      <View style={styles['information-container']}>
        <View>
          <Text style={styles['text-brand']}>{data.name}</Text>
          <Text style={styles['text-category']}>{data.category}</Text>
        </View>
        <View>
          <Text style={styles['text-price']}>${data.price}</Text>
          <Text style={styles['text-status']}>/per night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '99%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  image: {
    flex: 1,
    width: '99%',
    height: 120,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  'text-brand': {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
  },
  'text-price': {
    fontSize: 20,
    color: colors.blue,
    fontWeight: '500',
  },
  'text-category': {
    color: 'black',
  },
  'text-status': {
    color: '#808080',
  },
  'information-container': {
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7,
  },
  elevation: {
    shadowColor: colors.blue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,

    elevation: 3,
  },
});
