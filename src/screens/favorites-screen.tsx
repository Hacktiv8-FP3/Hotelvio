import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { iOSUIKit } from 'react-native-typography';
import { Text, View } from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';

import { HotelCard } from '../components/hotel-card';
import { Section } from '../components/section';
import { useAppSelector } from '../utils/redux';

export const FavoriteScreen: ScreenComponent = observer(({ componentId }) => {
  const { favorites } = useAppSelector((state) => state.favorites);
  return (
    <View flex bg-bgColor style={{ height: '100%' }}>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='Favorite Hotel'>
          {!favorites.length ? (
            <View
              style={{
                flex: 1,
                marginTop: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={iOSUIKit.title3Emphasized} marginV-s2>
                There is no favorites yet...
              </Text>
            </View>
          ) : (
            favorites.map((data) => (
              <HotelCard
                key={'favorite' + data.id}
                data={data}
                componentId={componentId}
              />
            ))
          )}
        </Section>
      </ScrollView>
    </View>
  );
});
