import { GuestModal, GuestProps } from '../components/GuestModal';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import {
  DateTimePicker,
  View,
  Incubator,
  ExpandableSection,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';
import { observer } from 'mobx-react';
import { HotelCard } from '../components/hotel-card';

import { screens } from '.';
import { useServices } from '../services';
import { Props as SampleProps } from './_screen-sample';
import { Section } from '../components/section';
import { Reanimated2 } from '../components/reanimated2';
import { Row } from '../components/row';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { ImageCard } from '../components/image-card';
import { getTopDestinations } from '../redux/TopCity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/Input';
import { Modalize } from 'react-native-modalize';
import { colors } from '../utils/color';
import axios from 'axios';
import { httpClient } from '../services/api';
import { debug } from 'react-native-reanimated';
import { getHotelByCategory } from '../redux/Property';

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
  const { data } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();
  const searchRef = createRef<TextInput>();
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState<GuestProps>({ adults: 1, children: 0 });
  const modalizeRef = useRef<Modalize>(null);

  const onOpenModal = () => {
    modalizeRef.current?.open();
  };

  // API Methods
  // const getCounterValue = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const {value} = await api.counter.get();

  //     counter.set('value', value);
  //   } catch (e) {
  //     console.log('[ERROR]', e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [api.counter, counter]);

  // Methods
  const push = () =>
    screens.push<SampleProps>(componentId, 'Sample', { type: 'push' });
  const show = () => screens.show<SampleProps>('Sample', { type: 'show' });

  // Start

  useEffect(() => {
    // !topCity.length &&
    //   dispatch(getTopDestinations({ state: 'CA', page: 1, items: 10 }));

    dispatch(
      getHotelByCategory({
        category: 'bali',
        checkOutDate: {
          day: 15,
          month: 10,
          year: 2022,
        },
        checkInDate: {
          day: 10,
          month: 10,
          year: 2022,
        },
        adult: 2,
      })
    );
  }, []);
  useEffect(() => {
    console.log(checkInDate);
  }, [checkInDate]);

  // useNavigationButtonPress(handleCounterInc, componentId, navButtons.inc.id);
  // useNavigationButtonPress(handleCounterDec, componentId, navButtons.dec.id);

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='Hello fellas 👋'>
          <TextField
            marginV-s2
            placeholder={t.do('home.filter.search')}
            ref={searchRef}
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
          <ExpandableSection expanded={expanded}>
            <Row spread style={[styles.inputField, styles.bgGray]} marginV-s2>
              <Row style={{ width: '50%' }}>
                <DateTimePicker
                  migrateTextField
                  mode={'date'}
                  minimumDate={new Date()}
                  value={checkInDate}
                  onChange={(date: Date) => setCheckInDate(date)}
                  renderInput={({ value }: { value: string }) => (
                    <Input
                      icon='calendar'
                      title={t.do('home.filter.checkIn')}
                      value={value}
                    />
                  )}
                />
              </Row>
              <Row row style={{ width: '50%' }}>
                <DateTimePicker
                  migrateTextField
                  mode={'date'}
                  minimumDate={new Date()}
                  value={checkOutDate}
                  onChange={(date: Date) => setCheckOutDate(date)}
                  renderInput={({ value }: { value: string }) => (
                    <Input
                      icon='calendar'
                      title={t.do('home.filter.checkOut')}
                      value={value}
                    />
                  )}
                />
              </Row>
            </Row>
            <View style={[styles.inputField, styles.bgGray]} marginV-s2>
              <TouchableOpacity onPress={onOpenModal}>
                <Input
                  icon='user'
                  value={`${guests.adults + guests.children} ${t.do(
                    'home.filter.guest.title'
                  )}`}
                />
              </TouchableOpacity>
            </View>
          </ExpandableSection>
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
                  key={index}
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
                  key={index}
                  text={item}
                  active={category === item}
                  onPress={() => setCategory(item)}
                />
              ))}
          </ScrollView>
        </Section>

        <Section title='Hotel'>
          {!!data.length &&
            data.map((_data: any) => (
              <HotelCard
                key={_data.id}
                data={{
                  ..._data,
                  category,
                }}
              />
            ))}
        </Section>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          childrenStyle={{ padding: 16 }}
        >
          <GuestModal setGuests={setGuests} guests={guests} />
        </Modalize>
      </ScrollView>
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
  borderGray: {
    borderColor: colors.grayBorder,
    borderWidth: 1,
  },
});
