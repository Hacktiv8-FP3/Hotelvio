import React from 'react';
import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import {
  Chip,
  Spacings,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
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
  addRoom,
  removeAdult,
  removeChild,
  removeRoom,
  selectChild,
} from '../redux/guest';

type Props = {
  modalRef: React.RefObject<Modalize>;
};

export const GuestModal: React.FC<Props> = ({ modalRef }) => {
  const { t } = useServices();
  const { rooms } = useAppSelector(({ guest }) => guest);
  const dispatch = useAppDispatch();

  const calculateAdult = () => {
    let total = 0;
    rooms.forEach((room) => {
      total += room.adults;
    });
    return total;
  };

  const calculateChild = () => {
    let total = 0;
    rooms.forEach((room) => {
      total += room.children.length;
    });
    return total;
  };

  const onOpenModal = (index: number) => {
    modalRef.current?.open();
    dispatch(selectChild(index));
  };

  return (
    <>
      <Text style={iOSUIKit.title3Emphasized} marginV-s2>
        {`${t.do('home.filter.rooms')} & ${t.do('home.filter.guest.title')}`}
      </Text>
      <Text style={iOSUIKit.callout} marginV-s2>
        {t.do('home.filter.rooms')}
      </Text>
      <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
        <Button flex-1 onPress={() => dispatch(removeRoom())}>
          -
        </Button>
        <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
          {rooms.length}
        </Text>
        <Button flex-1 onPress={() => dispatch(addRoom())}>
          +
        </Button>
      </Row>
      <Text style={iOSUIKit.callout} marginV-s2>
        {t.do('home.filter.guest.adult')}
      </Text>
      <Row style={[styles.inputField, styles.borderGray]} center paddingH-s7>
        <Button flex-1 onPress={() => dispatch(removeAdult())}>
          -
        </Button>
        <Text center flex-3 style={iOSUIKit.bodyEmphasized}>
          {calculateAdult()}
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
          {calculateChild()}
        </Text>
        <Button flex-1 onPress={() => dispatch(addChild())}>
          +
        </Button>
      </Row>
      {calculateChild() > 0 && (
        <>
          <Text style={iOSUIKit.callout} marginV-s2>
            {t.do('home.filter.guest.children.subtitle')}
          </Text>

          <View row style={{ flexWrap: 'wrap' }}>
            {rooms.map((room) =>
              room.children.map((_, index) => (
                <TouchableOpacity key={index}>
                  <Chip
                    label={`${t.do('home.filter.guest.children.chip')} ${
                      index + 1
                    }`}
                    rightElement={
                      <Ionicons
                        name='ios-chevron-down-circle-outline'
                        size={18}
                        color={
                          room.children[index].age ? colors.blue : colors.red
                        }
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
                </TouchableOpacity>
              ))
            )}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 15,
  },
  borderGray: {
    borderColor: colors.grayBorder,
    borderWidth: 1,
  },
});
