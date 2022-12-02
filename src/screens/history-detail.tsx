import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { iOSUIKit } from 'react-native-typography';
import { View, Text } from 'react-native-ui-lib';
import { Row } from '../components/row';
import { Section } from '../components/section';
import { useServices } from '../services';
import { StyleSheet } from 'react-native';
import { colors } from '../utils/color';
import thousandAndDecimalSeparator from '../utils/NumberFormatter';
import { HotelCard } from '../components/hotel-card';

export const HistoryDetail = ({
  data,
  componentId,
}: {
  data: any;
  componentId: string;
}) => {
  const { t } = useServices();
  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title='History detail'>
          <View
            style={{
              marginTop: 10,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HotelCard data={data.hotel} componentId={componentId} />
            <View bg-white style={styles.inputField}>
              <Row spread marginV-s1>
                <Text style={iOSUIKit.subhead}>
                  {t.do('home.filter.checkIn')}
                </Text>
                <Text style={iOSUIKit.bodyEmphasized}>{data.checkIn}</Text>
              </Row>
              <Row spread marginV-s1>
                <Text style={iOSUIKit.subhead}>
                  {t.do('home.filter.checkOut')}
                </Text>
                <Text style={iOSUIKit.bodyEmphasized}>{data.checkOut}</Text>
              </Row>
              <Row spread marginV-s1>
                <Text style={iOSUIKit.subhead}>
                  {t.do('home.filter.rooms')}
                </Text>
                <Text style={iOSUIKit.bodyEmphasized}>{data.rooms}</Text>
              </Row>
              <Row spread marginV-s1>
                <Text style={iOSUIKit.subhead}>
                  {t.do('home.filter.guest.title')}
                </Text>
                <Text style={iOSUIKit.bodyEmphasized}>{data.guest}</Text>
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
                <Text style={iOSUIKit.bodyEmphasized}>
                  {thousandAndDecimalSeparator(data.price)}
                </Text>
              </Row>
            </View>
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
