import React, { createRef, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import {
  DateTimePicker,
  View,
  Incubator,
  ExpandableSection,
  TouchableOpacity,
  Text,
  Colors,
} from 'react-native-ui-lib';
import { iOSUIKit } from 'react-native-typography';
import { ScreenComponent } from 'rnn-screens';
import { If } from '@kanzitelli/if-component';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { observer } from 'mobx-react';
import { HotelCard } from '../components/hotel-card';

import { screens } from '.';
import { useServices } from '../services';
import { useStores } from '../stores';
import { navButtons } from '../services/navigation/buttons';
import { Props as SampleProps } from './_screen-sample';
import { Section } from '../components/section';
import { BButton } from '../components/button';
import { Reanimated2 } from '../components/reanimated2';
import { Row } from '../components/row';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { ImageCard } from '../components/image-card';
import { getTopDestinations } from '../redux/TopCity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input } from '../components/Input';
import { Modalize } from 'react-native-modalize';
import { colors } from '../utils/color';

const { TextField } = Incubator;

export const Main: ScreenComponent = observer(({ componentId }) => {
  const { counter, ui } = useStores();
  const { t } = useServices();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { topCity } = useAppSelector(({ topCity }) => topCity);
  const dispatch = useAppDispatch();
  const searchRef = createRef<TextInput>();
  const [expanded, setExpanded] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
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
    !topCity.length &&
      dispatch(getTopDestinations({ state: 'CA', page: 1, items: 10 }));
  }, []);
  // useNavigationButtonPress(handleCounterInc, componentId, navButtons.inc.id);
  // useNavigationButtonPress(handleCounterDec, componentId, navButtons.dec.id);

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='Hello fellas 👋'>
          <TextField
            marginV-s2
            placeholder={'Search'}
            ref={searchRef}
            maxLength={30}
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
                <Ionicons name='ios-filter' size={20} color='#1bb65c' />
              </TouchableOpacity>
            }
          />
          <ExpandableSection expanded={expanded}>
            <Row spread style={[styles.inputField, styles.bgGray]} marginV-s2>
              <Row style={{ width: '50%' }}>
                <DateTimePicker
                  migrateTextField
                  placeholder={'Check-in Date'}
                  mode={'date'}
                  minimumDate={new Date()}
                  value={checkInDate}
                  onChange={(date: Date) => setCheckInDate(date)}
                  renderInput={({ value }: { value: string }) => (
                    <Input
                      icon='calendar'
                      title='Check-in Date'
                      value={value}
                    />
                  )}
                />
              </Row>
              <Row row style={{ width: '50%' }}>
                <DateTimePicker
                  migrateTextField
                  placeholder={'Check-out Date'}
                  mode={'date'}
                  minimumDate={new Date()}
                  value={checkOutDate}
                  onChange={(date: Date) => setCheckOutDate(date)}
                  renderInput={({ value }: { value: string }) => (
                    <Input
                      icon='calendar'
                      title='Check-in Date'
                      value={value}
                    />
                  )}
                />
              </Row>
            </Row>
            <View style={[styles.inputField, styles.bgGray]}>
              <TouchableOpacity onPress={onOpenModal}>
                <Input icon='user' value={`${guests} Persons`} />
              </TouchableOpacity>
            </View>
          </ExpandableSection>
        </Section>
        <Section title='Kota-kota di Indonesia'>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {!!topCity.length &&
              topCity.map((item, index) => (
                <ImageCard key={index} text={item.city} />
              ))}
          </ScrollView>
        </Section>
        <Section title='Popular Destination'>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
            <ImageCard />
          </ScrollView>
        </Section>

        <Section title='Hotel'>
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </Section>

        <Section title='Reanimated 2'>
          <Reanimated2 />
        </Section>

        {/* <Section title='MobX'>
          <View centerV>
            <Text marginB-s2 text60R textColor>
              App launches: {ui.appLaunches}
            </Text>

            <Text marginB-s2 text60R textColor>
              Counter:{' '}
              <If
                _={loading}
                _then={<Text textColor>Loading...</Text>}
                _else={<Text textColor>{products}</Text>}
              />
            </Text>

            <Row>
              <BButton margin-s1 label=' - ' onPress={handleCounterDec} />
              <BButton margin-s1 label=' + ' onPress={handleCounterInc} />
              <BButton margin-s1 label='reset' onPress={handleCounterReset} />
            </Row>
          </View>
        </Section> */}
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        childrenStyle={{ padding: 16 }}
      >
        <Text style={iOSUIKit.callout} marginV-s2>
          Guests
        </Text>
        <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
          <BButton label=' - ' onPress={() => setGuests(guests - 1)} flex-1 />
          <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
            {guests}
          </Text>
          <BButton label=' + ' onPress={() => setGuests(guests + 1)} flex-1 />
        </Row>
      </Modalize>
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
