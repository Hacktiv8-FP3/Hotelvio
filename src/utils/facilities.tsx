import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from './color';
export const facilitiesIcon = [
  {
    id: 1,
    name: 'parking',
    icon: <MaterialIcon name='local-parking' size={20} color={colors.black} />,
  },
  {
    id: 2,
    name: 'pet',
    icon: <MaterialIcon name='pet' size={20} color={colors.black} />,
  },
  {
    id: 3,
    name: 'swimming',
    icon: <FontAwesome5 name='swimming-pool' size={20} color={colors.black} />,
  },
  {
    id: 4,
    name: 'restaurant',
    icon: (
      <MaterialIcon name='local-restaurant' size={20} color={colors.black} />
    ),
  },
  {
    id: 5,
    name: 'wifi',
    icon: <MaterialIcon name='wifi' size={20} color={colors.black} />,
  },
];
