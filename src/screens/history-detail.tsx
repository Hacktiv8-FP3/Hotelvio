import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { iOSUIKit } from 'react-native-typography';
import { Text, View } from 'react-native-ui-lib';

import { HotelCard } from '../components/hotel-card';
import { Row } from '../components/row';
import { Section } from '../components/section';
import { useServices } from '../services';
import { colors } from '../utils/color';
import { History } from '../utils/types';

export const HistoryDetail = ({
  data,
  componentId,
}: {
  data: History;
  componentId: string;
}) => {
  const { t } = useServices();
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title={t.do('booking.detail.title')}>
          <HotelCard data={data.hotel} componentId={componentId} />
          <View bg-white style={styles.inputField}>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>
                {t.do('home.filter.checkIn')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>
                {data.checkIn.toLocaleDateString()}
              </Text>
            </Row>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>
                {t.do('home.filter.checkOut')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>
                {data.checkOut.toLocaleDateString()}
              </Text>
            </Row>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>{t.do('home.filter.rooms')}</Text>
              <Text style={iOSUIKit.bodyEmphasized}>{data.rooms}</Text>
            </Row>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>
                {t.do('home.filter.guest.title')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>{data.guests}</Text>
            </Row>
            <Row
              spread
              marginV-s1
              marginT-s3
              paddingT-s4
              style={{ borderTopWidth: 1, borderColor: colors.grayBorder }}
            >
              <Text style={iOSUIKit.subhead}>
                {t.do('booking.detail.total')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>{data.hotel.price}</Text>
            </Row>
          </View>
        </Section>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  inputField: {
    padding: 16,
    borderRadius: 15,
  },
  bgGray: {
    backgroundColor: colors.gray,
  },
});
