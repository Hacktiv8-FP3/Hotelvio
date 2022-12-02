import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleSheet } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { addFavorite, removeFavorite } from '../redux/favorites';
import { setSelectedHotel } from '../redux/property';
import { screens } from '../screens';
import { HotelDetailProps } from '../screens/hotel-detail';
import { colors } from '../utils/color';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { HotelData } from '../utils/types';

export const HotelCard: React.FC<{ data: HotelData; componentId: string }> = ({
  data,
  componentId,
}) => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  const push = () => {
    dispatch(setSelectedHotel(data));
    screens.push<HotelDetailProps>(componentId, 'HotelDetail', {
      id: data.id,
      price: data.price,
    });
  };

  const isFavorite = () => {
    return favorites.filter(({ id }) => id === data.id).length === 1;
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles.elevation]}
      onPress={push}
    >
      <Image
        source={require('../images/background2.jpg')}
        style={styles.image}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          right: 0,
          paddingRight: 6,
          paddingTop: 3,
        }}
        onPress={() => {
          console.log(data.id);
          isFavorite()
            ? dispatch(removeFavorite({ id: data.id }))
            : dispatch(addFavorite(data));
        }}
      >
        <AntDesign
          name={isFavorite() ? 'like1' : 'like2'}
          size={28}
          color={'#fff'}
        />
      </TouchableOpacity>
      <View style={styles['information-container']}>
        <View>
          <Text style={styles['text-brand']}>{data.name}</Text>
          <Text style={styles['text-category']}>{data.category}</Text>
        </View>
        <View right>
          <Text style={styles['text-price']}>{data.price}</Text>
          <Text style={styles['text-status']}>/per night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const HotelCardLoading: React.FC = () => {
  return (
    <ContentLoader
      width='100%'
      height={160}
      viewBox='0 24 450 160'
      backgroundColor='#f0f0f0'
      foregroundColor='#dedede'
    >
      <Rect x='0' y='143' rx='4' ry='4' width='70%' height='9' />
      <Rect x='0' y='157' rx='3' ry='3' width='20%' height='6' />
      <Rect x='0' y='0' rx='10' ry='10' width='100%' height='138' />
    </ContentLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    width: 200,
    flexWrap: 'wrap',
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
