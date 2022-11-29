import React from 'react';
import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { Text } from 'react-native-ui-lib';
import { colors } from '../utils/color';
import { BButton } from './button';
import { Row } from './row';

type Props = {
  setGuests: (guests: number) => void;
  guests: number;
};

export const GuestModal: React.FC<Props> = ({ setGuests, guests }) => {
  return (
    <>
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
