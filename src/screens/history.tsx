import { observer } from 'mobx-react';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';

import { HistoryCard } from '../components/history-card';
import { Section } from '../components/section';
import { useAppSelector } from '../utils/redux';

export const History: ScreenComponent<{}> = observer(({ componentId }) => {
  const { histories } = useAppSelector((state) => state.history);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section />
        {histories.map((data, index) => (
          <HistoryCard data={data} componentId={componentId} key={index} />
        ))}
      </ScrollView>
    </View>
  );
});
