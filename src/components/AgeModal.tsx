import _ from 'lodash';
import React, { useCallback } from 'react';
import { iOSUIKit } from 'react-native-typography';
import { Incubator, Text } from 'react-native-ui-lib';
import { updateChildAge } from '../redux/guest';
import { useServices } from '../services';
import { colors } from '../utils/color';
import { useAppDispatch } from '../utils/redux';

const AgeModal: React.FC = () => {
  const { t } = useServices();
  const dispatch = useAppDispatch();

  const getItems = useCallback((items: number[]) => {
    return _.map(items, (item) => ({
      label: `${item} ${t.do('home.filter.guest.children.age.label')}`,
      value: item,
    }));
  }, []);

  return (
    <>
      <Text style={iOSUIKit.title3Emphasized} marginV-s2>
        {t.do('home.filter.guest.children.age.title')}
      </Text>
      <Incubator.WheelPicker
        items={getItems(_.range(1, 18))}
        onChange={(value: number) => dispatch(updateChildAge(value))}
        activeTextColor={colors.blue}
      />
    </>
  );
};

export default AgeModal;
