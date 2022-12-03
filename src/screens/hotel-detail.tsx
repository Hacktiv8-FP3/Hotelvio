import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Modalize, useModalize } from 'react-native-modalize';
import Animated from 'react-native-reanimated';
import { iOSUIKit } from 'react-native-typography';
import { Text, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenComponent } from 'rnn-screens';

import AgeModal from '../components/age-modal';
import { Button } from '../components/button';
import { CommentRate } from '../components/comment-rate';
import FilterInput from '../components/filter-input';
import { GuestModal } from '../components/guest-modal';
import { IconCard } from '../components/icon-card';
import { Row } from '../components/row';
import { StarRate } from '../components/star-rate';
import { getHotelDetail } from '../redux/detail';
import { useServices } from '../services';
import { colors } from '../utils/color';
import { facilitiesIcon } from '../utils/facilities';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { screens } from '.';

export type HotelDetailProps = {
  id: string;
  price: string;
};

const facilities = ['restaurant', 'swimming', 'wifi', 'parking', 'pets'];

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

export const HotelDetail: ScreenComponent<HotelDetailProps> = ({
  componentId,
  id,
  price,
}) => {
  const { t } = useServices();
  const { data, loading } = useAppSelector(({ detail }) => detail);
  const { isLogin } = useAppSelector(({ login }) => login);
  const dispatch = useAppDispatch();
  const { ref, open } = useModalize();
  const guestModalRef = useRef<Modalize>(null);
  const ageModalRef = useRef<Modalize>(null);

  const onOpenModal = () => {
    if (isLogin) {
      return open('top');
    }
    return screens.show('Login');
  };

  const onPressContinue = () => {
    screens.push(componentId, 'Booking');
  };

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
            <Text style={styles['hotel-name']}>{data?.name}</Text>
            <Text style={styles.address}>
              <Ionicons
                name='md-location-sharp'
                size={20}
                color={colors.blue}
              />
              {data?.location}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>{data?.caption}</Text>
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
            {!loading && <StarRate star={data?.rating!} />}
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

      <Modalize
        ref={ref}
        alwaysOpen={100}
        handlePosition='inside'
        modalStyle={styles.modal}
        childrenStyle={{ padding: 16 }}
        modalHeight={350}
      >
        <Row spread>
          <Text style={[iOSUIKit.title3Emphasized, { color: colors.blue }]}>
            {price}
            <Text style={iOSUIKit.subhead}> / night</Text>
          </Text>
          <Button onPress={onOpenModal}>{t.do('hotelDetail.book')}</Button>
        </Row>
        <View marginT-s4>
          <FilterInput guestModalRef={guestModalRef} />
          <Button onPress={onPressContinue}>
            {t.do('hotelDetail.continue')}
          </Button>
        </View>
      </Modalize>

      <Modalize
        ref={guestModalRef}
        adjustToContentHeight
        childrenStyle={{ padding: 16 }}
      >
        <GuestModal modalRef={ageModalRef} />
      </Modalize>

      <Modalize
        ref={ageModalRef}
        adjustToContentHeight
        childrenStyle={{ padding: 16 }}
        customRenderer={
          <Animated.View>
            <AgeModal />
          </Animated.View>
        }
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
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  //   starRate: {
  //     position: 'absolute',
  //     top: 20,
  //     right: 20,
  //   },
});
