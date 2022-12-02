import React, { useCallback, useState } from 'react';
import { Incubator, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { login } from '../redux/user';
import { colors } from '../utils/color';
import { screens } from '.';
import { ScreenComponent } from 'rnn-screens';
import { observer } from 'mobx-react-lite';
import { Button } from '../components/button';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import { iOSUIKit } from 'react-native-typography';
import { useServices } from '../services';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, StyleSheet } from 'react-native';

const { TextField } = Incubator;

export const Login: ScreenComponent = observer(() => {
  const { t } = useServices();
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(({ login }) => login);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onPressLogin = useCallback(() => {
    dispatch(login({ email, password }));
    if (!isLogin) {
      screens.N.dismissAllModals();
    }
  }, [email, password]);

  return (
    <View flex bg-bgColor>
      <SafeAreaView style={styles.container}>
        <View margin-s2 marginV-s10 paddingH-s3 flex>
          <Text style={iOSUIKit.largeTitleEmphasized} abs>
            {t.do('login.title')}
          </Text>

          <View>
            <TextField
              placeholder='Email'
              value={email}
              onChangeText={setEmail}
              maxLength={29}
              fieldStyle={styles.inputField}
              leadingAccessory={
                <View marginR-10>
                  <MaterialCommunityIcons
                    name='email-variant'
                    size={20}
                    color={colors.lightGray}
                  />
                </View>
              }
            />
            <TextField
              secureTextEntry={!visible}
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              maxLength={29}
              fieldStyle={styles.inputField}
              leadingAccessory={
                <View marginR-10>
                  <MaterialCommunityIcons
                    name='lock'
                    size={20}
                    color={colors.lightGray}
                  />
                </View>
              }
              trailingAccessory={
                <TouchableOpacity
                  marginL-10
                  onPress={() => setVisible((currentVal) => !currentVal)}
                >
                  <MaterialCommunityIcons
                    name={visible ? 'eye' : 'eye-off'}
                    size={20}
                    color={visible ? colors.blue : colors.lightGray}
                  />
                </TouchableOpacity>
              }
            />
            <Button marginT-s6 onPress={onPressLogin}>
              {t.do('login.button')}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  inputField: {
    marginTop: 10,
    padding: 16,
    borderRadius: 15,
    backgroundColor: colors.gray,
  },
  container: {
    display: 'flex',
    flex: 1,
  },
});
