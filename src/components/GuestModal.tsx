import React from 'react';
import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { Chip, Spacings, Text, View } from 'react-native-ui-lib';
import { useServices } from '../services';
import { colors } from '../utils/color';
import { Button } from './button';
import { Row } from './row';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modalize } from 'react-native-modalize';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import {
  addAdult,
  addChild,
  removeAdult,
  removeChild,
  selectChild,
} from '../redux/guest';

type Props = {
  modalRef: React.RefObject<Modalize>;
};

export const GuestModal: React.FC<Props> = ({ modalRef }) => {
  const { t } = useServices();
  const { guests } = useAppSelector(({ guest }) => guest);
  const dispatch = useAppDispatch();

  console.log('guest modal rendered');

  const onOpenModal = (index: number) => {
    modalRef.current?.open();
    dispatch(selectChild(index));
  };

  return (
    <>
      <Text style={iOSUIKit.title3Emphasized} marginV-s2>
        {t.do('home.filter.guest.title')}
      </Text>
      <Text style={iOSUIKit.callout} marginV-s2>
        {t.do('home.filter.guest.adult')}
      </Text>
      <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
        <Button flex-1 onPress={() => dispatch(removeAdult())}>
          -
        </Button>
        <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
          {guests.adults}
        </Text>
        <Button flex-1 onPress={() => dispatch(addAdult())}>
          +
        </Button>
      </Row>
      <Text style={iOSUIKit.callout} marginV-s2>
        {t.do('home.filter.guest.children.title')}
      </Text>
      <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
        <Button flex-1 onPress={() => dispatch(removeChild())}>
          -
        </Button>
        <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
          {guests.children.length - 1}
        </Text>
        <Button flex-1 onPress={() => dispatch(addChild())}>
          +
        </Button>
      </Row>
      {guests.children.length > 1 && (
        <>
          <Text style={iOSUIKit.callout} marginV-s2>
            {t.do('home.filter.guest.children.subtitle')}
          </Text>

          <View row style={{ flexWrap: 'wrap' }}>
            {guests.children.slice(1).map((child, index) => (
              <Chip
                key={index}
                label={`${t.do('home.filter.guest.children.chip')} ${
                  index + 1
                }`}
                rightElement={
                  <Ionicons
                    name='ios-chevron-down-circle-outline'
                    size={18}
                    color={colors.blue}
                    style={{
                      marginLeft: Spacings.s1,
                      marginRight: Spacings.s2,
                    }}
                  />
                }
                containerStyle={{
                  margin: Spacings.s1,
                }}
                onPress={() => onOpenModal(index)}
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputField: {
    padding: 16,
    borderRadius: 15,
  },
  borderGray: {
    borderColor: colors.grayBorder,
    borderWidth: 1,
  },
});
