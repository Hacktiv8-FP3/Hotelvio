import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, MarginModifiers } from 'react-native-ui-lib';
// import { Bounceable } from 'rn-bounceable';
import { colors } from '../utils/color';

type Props = MarginModifiers & {
  label?: string;
  onPress?: PureFunc;
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ ...styles.text, ...styles.buttonText }}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.blue,
  },
  button: {
    color: colors.blue,
    backgroundColor: colors.yellow,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
  },
});
