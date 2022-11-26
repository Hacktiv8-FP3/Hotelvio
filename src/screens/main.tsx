import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
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
import { BButton } from '../components/button';
import { Reanimated2 } from '../components/reanimated2';
import { Row } from '../components/row';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { ImageCard } from '../components/image-card';
import { getTopDestinations } from '../redux/TopCity';
import { httpClient } from '../services/api';

export const Main: ScreenComponent = observer(({ componentId }) => {
  const { counter, ui } = useStores();
  const { t } = useServices();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { topCity, loading } = useAppSelector(({ topCity }) => topCity);
  const dispatch = useAppDispatch();
  console.log('topCity', topCity);

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
    console.log('config', Config.API_KEY);
    dispatch(getTopDestinations({ state: 'CA', page: 1, items: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useNavigationButtonPress(handleCounterInc, componentId, navButtons.inc.id);
  useNavigationButtonPress(handleCounterDec, componentId, navButtons.dec.id);

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='Kota-kota di Indonesia'>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            {topCity.map((item, index) => (
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
});
