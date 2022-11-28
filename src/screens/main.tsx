import React, { createRef, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import {
  DateTimePicker,
  View,
  Incubator,
  ExpandableSection,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';
import { If } from '@kanzitelli/if-component';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { observer } from 'mobx-react';

import { screens } from '.';
import { useServices } from '../services';
import { useStores } from '../stores';
import { navButtons } from '../services/navigation/buttons';
import { Props as SampleProps } from './_screen-sample';
import { Section } from '../components/section';
// import { BButton } from '../components/button';
// import { Reanimated2 } from '../components/reanimated2';
// import { Row } from '../components/row';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { ImageCard } from '../components/image-card';
import { getTopDestinations } from '../redux/TopCity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DateTimePickerInput } from '../components/DateTimePickerInput';

const { TextField } = Incubator;

export const Main: ScreenComponent = observer(({ componentId }) => {
  const { counter, ui } = useStores();
  const { t } = useServices();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { topCity } = useAppSelector(({ topCity }) => topCity);
  const dispatch = useAppDispatch();
  const searchRef = createRef<TextInput>();
  const [expanded, setExpanded] = useState(false);

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

  const handleCounterDec = () => dispatch(removeProduct());
  const handleCounterInc = () => dispatch(addProduct());
  const handleCounterReset = () => counter.set('value', 0);

  // Start

  useEffect(() => {
    !topCity.length &&
      dispatch(getTopDestinations({ state: 'CA', page: 1, items: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useNavigationButtonPress(handleCounterInc, componentId, navButtons.inc.id);
  useNavigationButtonPress(handleCounterDec, componentId, navButtons.dec.id);

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='Hello fellas 👋'>
          <TextField
            placeholder={'Search'}
            ref={searchRef}
            maxLength={30}
            fieldStyle={styles.inputField}
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
            <View row spread style={styles.inputField}>
              <View row style={{ backgroundColor: '', width: '50%' }}>
                <DateTimePicker
                  placeholder={'Check-in Date'}
                  mode={'date'}
                  renderInput={() => (
                    <DateTimePickerInput title='Check-in Date' />
                  )}
                />
              </View>
              <View row style={{ backgroundColor: '', width: '50%' }}>
                <DateTimePicker
                  placeholder={'Check-out Date'}
                  mode={'date'}
                  renderInput={() => (
                    <DateTimePickerInput title='Check-out Date' />
                  )}
                />
              </View>
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

        {/* <Section title={t.do('section.navigation.title')}>
          <BButton
            marginV-s1
            label={t.do('section.navigation.button.push')}
            onPress={push}
          />
          <BButton
            marginV-s1
            label={t.do('section.navigation.button.show')}
            onPress={show}
          />
        </Section>

        <Section title='Reanimated 2'>
          <Reanimated2 />
        </Section>

        <Section title='MobX'>
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

        {/* <Section title="API">
          <BButton
            margin-s1
            label="Update counter value from API"
            onPress={getCounterValue}
          />
        </Section> */}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 8,
  },
  inputField: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 15,
    marginTop: 16,
  },
});
