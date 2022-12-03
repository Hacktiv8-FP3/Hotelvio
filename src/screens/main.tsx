import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Animated from 'react-native-reanimated';
import { Incubator, TouchableOpacity, View } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenComponent } from 'rnn-screens';

import AgeModal from '../components/age-modal';
import FilterInput from '../components/filter-input';
import { GuestModal } from '../components/guest-modal';
import { HotelCard, HotelCardLoading } from '../components/hotel-card';
import { ImageCard } from '../components/image-card';
import { Section } from '../components/section';
import { getHotelByCategory } from '../redux/property';
import { useServices } from '../services';
import { colors } from '../utils/color';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import useDebounce from '../utils/useDebounce';

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
        category: debouncedSearch ? debouncedSearch : category,
        checkOutDate: {
          day: checkOut ? checkOut.getDate() : new Date().getDate() + 7,
          month: checkOut ? checkOut.getMonth() + 1 : new Date().getMonth() + 1,
          year: checkOut ? checkOut.getFullYear() : new Date().getFullYear(),
        },
        checkInDate: {
          day: checkIn ? checkIn.getDate() : new Date().getDate(),
          month: checkIn ? checkIn.getMonth() + 1 : new Date().getMonth() + 1,
          year: checkIn ? checkIn.getFullYear() : new Date().getFullYear(),
        },
        rooms: rooms,
      })
    );
  }, [category, rooms, checkIn, checkOut, debouncedSearch]);

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
