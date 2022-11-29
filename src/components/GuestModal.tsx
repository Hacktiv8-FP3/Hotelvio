import React from 'react';
import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { Text } from 'react-native-ui-lib';
import { useServices } from '../services';
import { colors } from '../utils/color';
import { BButton } from './button';
import { Row } from './row';

export type GuestProps = {
  adults: number;
  children: number;
};

type Props = {
  setGuests: (guests: GuestProps) => void;
  guests: GuestProps;
};

export const GuestModal: React.FC<Props> = ({ setGuests, guests }) => {
  const { t } = useServices();

  return (
    <>
      <Text style={iOSUIKit.callout} marginV-s2>
        {t.do('home.filter.guest.adult')}
      </Text>
      <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
        <BButton
          label=' - '
          onPress={() => setGuests({ ...guests, adults: guests.adults - 1 })}
          flex-1
        />
        <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
          {guests.adults}
        </Text>
        <BButton
          label=' + '
          onPress={() => setGuests({ ...guests, adults: guests.adults + 1 })}
          flex-1
        />
      </Row>
      <Text style={iOSUIKit.callout} marginV-s2>
        {t.do('home.filter.guest.children')}
      </Text>
      <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
        <BButton
          label=' - '
          onPress={() =>
            setGuests({ ...guests, children: guests.children - 1 })
          }
          flex-1
        />
        <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
          {guests.children}
        </Text>
        <BButton
          label=' + '
          onPress={() =>
            setGuests({ ...guests, children: guests.children + 1 })
          }
          flex-1
        />
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
