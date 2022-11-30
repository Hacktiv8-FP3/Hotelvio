import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import { Checkbox } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/user';
import { RootState } from '../redux/reducer';
import { colors } from '../utils/color';
import { screens } from '.';
import { ScreenComponent } from 'rnn-screens';
import { observer } from 'mobx-react-lite';
import { Button } from '../components/button';
// import { Image } from 'react-native-ui-lib';

const intialState = {
  email: '',
  password: '',
};
export const LoginScreen: ScreenComponent = observer(({ componentId }) => {
  const [input, setInput] = useState(intialState);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.login);

  const handleLogin = useCallback(() => {
    // console.log(input);
    dispatch(login(input));
    if (state.isLogin) {
      screens.pop(componentId);
    }
  }, [state.isLogin, input]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles['child-container']}>
        <Text style={styles.titleText}>Login to your Account</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={input.email}
          onChangeText={(text) =>
            setInput((currentVal) => ({ ...currentVal, email: text }))
          }
          placeholder='Email'
          keyboardType='email-address'
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>

        <TextInput
          secureTextEntry={visible}
          textContentType='password'
          value={input.password}
          placeholder='Password'
          style={styles.input}
          onChangeText={(text) =>
            setInput((currentVal) => ({ ...currentVal, password: text }))
          }
        />
        <View style={styles.showPass}>
          <Checkbox
            value={visible}
            onValueChange={setVisible}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Show password</Text>
        </View>
        {/* <Button title='Sign In jdjdjdjdjj' color='#FEDE00' /> */}
        <Button onPress={handleLogin}>Sign In</Button>
      </View>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 40,
  },
  'child-container': {
    marginLeft: 10,
  },
  'image-container': {
    height: '50%',
  },
  text: {
    color: colors.blue,
  },
  image: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.blue,
    width: '60%',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '90%',
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderWidth: 1.5,
    borderBottomColor: colors.grayBorder,
    color: 'black',
    fontWeight: '500',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkbox: {
    borderColor: colors.blue,
    marginRight: 5,
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1.8,
  },
  showPass: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
  label: {
    color: 'black',
  },
});
