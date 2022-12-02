import { GuestModal } from '../components/guest-modal';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Incubator, TouchableOpacity } from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';
import { observer } from 'mobx-react';
import { HotelCard, HotelCardLoading } from '../components/hotel-card';

import { useServices } from '../services';

import { Section } from '../components/section';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { ImageCard } from '../components/image-card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modalize } from 'react-native-modalize';
import { colors } from '../utils/color';
import { getHotelByCategory } from '../redux/Property';
import Animated from 'react-native-reanimated';
import AgeModal from '../components/age-modal';
import useDebounce from '../utils/useDebounce';
import FilterInput from '../components/filter-input';

const { TextField } = Incubator;

const topCity = ['Bandung', 'Jakarta', 'Medan', 'Makassar', 'Surabaya'];
const popularCity = [
  'Yogyakarta',
  'Ubud',
  'Kuta',
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Banjarmasin',
];

export const Main: ScreenComponent = observer(({ componentId }) => {
  const { t } = useServices();
  const { data, loading } = useAppSelector(({ property }) => property);
  const { rooms, checkIn, checkOut } = useAppSelector(({ guest }) => guest);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>();
  const debouncedSearch = useDebounce(search, 500);

  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState('Indonesia');
  const guestModalRef = useRef<Modalize>(null);
  const ageModalRef = useRef<Modalize>(null);

  useEffect(() => {
    dispatch(
      getHotelByCategory({
        category: debouncedSearch ? debouncedSearch + category : category,
        checkOutDate: {
          day: checkOut ? checkOut.getDate() : new Date().getDate() + 7,
          month: checkOut ? checkOut.getMonth() : new Date().getMonth(),
          year: checkOut ? checkOut.getFullYear() : new Date().getFullYear(),
        },
        checkInDate: {
          day: checkIn ? checkIn.getDate() : new Date().getDate(),
          month: checkIn ? checkIn.getMonth() : new Date().getMonth(),
          year: checkIn ? checkIn.getFullYear() : new Date().getFullYear(),
        },
        rooms: rooms,
      })
    );
  }, [category, rooms, checkIn, checkOut]);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='Hello fellas 👋'>
          <TextField
            marginV-s2
            placeholder={t.do('home.filter.search')}
            value={search}
            onChangeText={setSearch}
            maxLength={29}
            fieldStyle={[styles.inputField, styles.bgGray]}
            leadingAccessory={
              <View marginR-10>
                <Ionicons name='search' size={20} />
              </View>
            }
            trailingAccessory={
              <TouchableOpacity
                marginL-10
                onPress={() => setExpanded(!expanded)}
              >
                <Ionicons name='ios-filter' size={20} color={colors.blue} />
              </TouchableOpacity>
            }
          />
          <FilterInput expanded={expanded} guestModalRef={guestModalRef} />
        </Section>
        <Section title={t.do('home.cities')}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {!!topCity.length &&
              topCity.map((item, index) => (
                <ImageCard
                  key={'topCity' + index}
                  text={item}
                  active={category === item}
                  onPress={() => setCategory(item)}
                />
              ))}
          </ScrollView>
        </Section>
        <Section title={t.do('home.popular')}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {!!popularCity.length &&
              popularCity.map((item, index) => (
                <ImageCard
                  key={'popularCity' + index}
                  text={item}
                  active={category === item}
                  onPress={() => setCategory(item)}
                />
              ))}
          </ScrollView>
        </Section>

        <Section title='Hotel'>
          {loading ? (
            <HotelCardLoading />
          ) : (
            !!data.length &&
            data.map((_data: any) => (
              <HotelCard
                componentId={componentId}
                key={'main' + _data.id}
                data={{
                  ..._data,
                  category,
                }}
              />
            ))
          )}
        </Section>
      </ScrollView>

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
});

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 8,
  },
  inputField: {
    padding: 16,
    borderRadius: 15,
  },
  bgGray: {
    backgroundColor: colors.gray,
  },
});
