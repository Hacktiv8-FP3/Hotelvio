import React, { PropsWithChildren, useEffect } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { FloatingButton, Text, View } from 'react-native-ui-lib';
import { colors } from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { facilitiesIcon } from '../utils/facilities';
import { IconCard } from '../components/icon-card';
import { StarRate } from '../components/star-rate';
import { CommentRate } from '../components/comment-rate';
import { useAppDispatch, useAppSelector } from '../utils/redux';

import { getHotelDetail } from '../redux/Detail';
import { ScreenComponent } from 'rnn-screens';

export type HotelDetailProps = {
  id: string;
};

const facilities = ['restaurant', 'swimming', 'wifi', 'parking', 'pet'];

export const HotelSection: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <View style={styles['section-container']}>
      <Text style={styles['section-title']}>{title}</Text>
      {children}
    </View>
  );
};
export const HotelDetail: ScreenComponent<HotelDetailProps> = ({ id }) => {
  const { data, loading }: { data: any; loading: boolean } = useAppSelector(
    (state) => state.detail
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHotelDetail(id));
  }, []);

  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <View style={styles.container}>
          <Image
            source={require('../images/background3.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles['child-container']}>
          <View style={styles['information-container']}>
            <Text style={styles['hotel-name']}>{data.name}</Text>
            <Text style={styles.address}>
              <Ionicons
                name='md-location-sharp'
                size={20}
                color={colors.blue}
              />
              {data.location}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>{data.caption}</Text>
          </View>

          <HotelSection title='Facilities'>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles['facilities-container']}
            >
              {facilities.map((item) => {
                const temp = facilitiesIcon.filter(
                  (icon) => icon.name === item
                )[0];
                return (
                  <IconCard text={temp?.name} key={temp?.id}>
                    {temp?.icon}
                  </IconCard>
                );
              })}
            </ScrollView>
          </HotelSection>
          <HotelSection title='Reviews'>
            {!loading && <StarRate star={data.rating} />}
            <CommentRate
              comment={
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aut recusandae dignissimos debitis praesentium possimus ex eos corrupti, autem illum illo et, eligendi explicabo, voluptas omnis distinctio numquam quo laborum.'
              }
            />
            <CommentRate
              comment={
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aut recusandae dignissimos debitis praesentium possimus ex eos corrupti, autem illum illo et, eligendi explicabo, voluptas omnis distinctio numquam quo laborum.'
              }
            />
          </HotelSection>
        </View>
      </ScrollView>
      <FloatingButton
        visible
        button={{
          label: 'Book this hotel',
          onPress: () => console.log('approved'),
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  'child-container': {
    paddingLeft: '4%',
  },
  'information-container': {
    width: '65%',
  },
  'hotel-name': {
    fontSize: 28,
    fontWeight: '600',
  },
  address: {
    marginTop: 6,
    color: '#9AA5B4',
    fontSize: 15,
    fontWeight: '500',
  },
  'section-title': {
    fontWeight: '500',
    fontSize: 20,
  },
  'section-container': {
    marginTop: 20,
  },
  'facilities-container': {
    flexDirection: 'row',
    marginTop: 10,
  },
  //   starRate: {
  //     position: 'absolute',
  //     top: 20,
  //     right: 20,
  //   },
});
