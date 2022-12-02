import React from 'react';
import { StyleSheet } from 'react-native';
import { Incubator, Text, View } from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';
import { colors } from '../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useServices } from '../services';
import { Section } from '../components/section';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { HotelCard } from '../components/hotel-card';
import { Row } from '../components/row';
import calculateGuest from '../utils/calculateGuest';
import thousandAndDecimalSeparator from '../utils/NumberFormatter';
import { ScrollView } from 'react-native-gesture-handler';
import { iOSUIKit } from 'react-native-typography';
import SwipeButton from 'rn-swipe-button';
import { screens } from '.';
import { addHistory } from '../redux/history';

const { TextField } = Incubator;

export const Booking: ScreenComponent = ({ componentId }) => {
  const { t } = useServices();
  const { user } = useAppSelector(({ login }) => login);
  const { checkIn, checkOut, rooms } = useAppSelector(({ guest }) => guest);
  const { selectedHotel } = useAppSelector(({ property }) => property);
  const dispath = useAppDispatch();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        <Section title={t.do('booking.contact.title')}>
          <TextField
            marginV-s2
            value={user?.firstName}
            placeholder={t.do('booking.contact.firstName')}
            maxLength={29}
            fieldStyle={[styles.inputField, styles.bgGray]}
          />
          <TextField
            marginV-s2
            value={user?.lastName}
            placeholder={t.do('booking.contact.lastName')}
            maxLength={29}
            fieldStyle={[styles.inputField, styles.bgGray]}
          />
          <TextField
            marginV-s2
            value={user?.email}
            placeholder={t.do('booking.contact.email')}
            maxLength={29}
            fieldStyle={[styles.inputField, styles.bgGray]}
            leadingAccessory={
              <View marginR-10>
                <MaterialCommunityIcons name='email-variant' size={20} />
              </View>
            }
          />
          <TextField
            marginT-s2
            value={user?.phone}
            placeholder={t.do('booking.contact.phone')}
            maxLength={29}
            fieldStyle={[styles.inputField, styles.bgGray]}
            leadingAccessory={
              <View marginR-10>
                <MaterialCommunityIcons name='cellphone' size={20} />
              </View>
            }
          />
        </Section>
        <Section title={t.do('booking.detail.title')}>
          <HotelCard data={selectedHotel} componentId={componentId} />
          <View bg-white style={styles.inputField}>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>
                {t.do('home.filter.checkIn')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>
                {checkIn?.toLocaleDateString()}
              </Text>
            </Row>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>
                {t.do('home.filter.checkOut')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>
                {checkOut?.toLocaleDateString()}
              </Text>
            </Row>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>{t.do('home.filter.rooms')}</Text>
              <Text style={iOSUIKit.bodyEmphasized}>{rooms.length}</Text>
            </Row>
            <Row spread marginV-s1>
              <Text style={iOSUIKit.subhead}>
                {t.do('home.filter.guest.title')}
              </Text>
              <Text style={iOSUIKit.bodyEmphasized}>
                {calculateGuest(rooms)}
              </Text>
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
                {thousandAndDecimalSeparator(selectedHotel?.price)}
              </Text>
            </Row>
          </View>
        </Section>
        <SwipeButton
          title={t.do('booking.button')}
          titleStyles={iOSUIKit.bodyEmphasized}
          width='90%'
          containerStyles={{ alignSelf: 'center' }}
          railBackgroundColor={colors.yellow}
          railBorderColor={colors.yellow}
          railFillBackgroundColor='#d6bb02'
          railFillBorderColor='transparent'
          thumbIconBackgroundColor={colors.blue}
          thumbIconBorderColor={colors.blue}
          onSwipeSuccess={() => {
            const data = {
              checkIn: checkIn,
              checkOut: checkOut,
              hotel: selectedHotel,
              guest: calculateGuest(rooms),
              rooms: rooms.length,
              bookDate: new Date().toISOString().split('T')[0],
            };
            dispath(addHistory(data));
            screens.N.popToRoot(componentId);
          }}
        />
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
