import React from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import {
  DateTimePicker,
  ExpandableSection,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import { setCheckIn, setCheckOut } from '../redux/guest';
import { useServices } from '../services';
import calculateGuest from '../utils/calculateGuest';
import { colors } from '../utils/color';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { Input } from './Input';
import { Row } from './row';

type Props = {
  expanded?: boolean;
  guestModalRef: React.RefObject<Modalize>;
};

const FilterInput: React.FC<Props> = ({ expanded, guestModalRef }) => {
  const { t } = useServices();
  const { checkIn, checkOut, rooms } = useAppSelector(({ guest }) => guest);
  const dispatch = useAppDispatch();

  const onOpenGuestModal = () => {
    guestModalRef.current?.open();
  };

  return (
    <ExpandableSection expanded={expanded ? expanded : true}>
      <Row spread style={styles.inputField} marginV-s2>
        <Row style={{ width: '50%' }}>
          <DateTimePicker
            migrateTextField
            mode={'date'}
            minimumDate={new Date()}
            value={checkIn}
            onChange={(date: Date) => dispatch(setCheckIn(date))}
            renderInput={({ value }: { value: string }) => (
              <Input
                icon='calendar'
                title={t.do('home.filter.checkIn')}
                value={value}
              />
            )}
          />
        </Row>
        <Row row style={{ width: '50%' }}>
          <DateTimePicker
            migrateTextField
            mode={'date'}
            minimumDate={new Date()}
            value={checkOut}
            onChange={(date: Date) => dispatch(setCheckOut(date))}
            renderInput={({ value }: { value: string }) => (
              <Input
                icon='calendar'
                title={t.do('home.filter.checkOut')}
                value={value}
              />
            )}
          />
        </Row>
      </Row>
      <View style={styles.inputField} marginV-s2>
        <TouchableOpacity onPress={onOpenGuestModal}>
          <Input
            icon='user'
            value={`${rooms.length} ${t.do(
              'home.filter.rooms'
            )}, ${calculateGuest(rooms)} ${t.do('home.filter.guest.title')}`}
          />
        </TouchableOpacity>
      </View>
    </ExpandableSection>
  );
};

export default FilterInput;

const styles = StyleSheet.create({
  inputField: {
    padding: 16,
    borderRadius: 15,
    backgroundColor: colors.gray,
  },
});
