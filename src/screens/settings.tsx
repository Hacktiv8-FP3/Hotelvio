import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { iOSUIKit } from 'react-native-typography';
import {
  Colors,
  RadioButton,
  RadioGroup,
  SegmentedControl,
  Text,
  View,
} from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';

import { Button } from '../components/button';
import { Row } from '../components/row';
import { Section } from '../components/section';
import { editData, logout } from '../redux/user';
import { useServices } from '../services';
import { navButtons } from '../services/navigation/buttons';
import { useStores } from '../stores';
import { colors } from '../utils/color';
import { useAppDispatch, useAppSelector } from '../utils/redux';
import {
  appearances,
  appearancesUI,
  appearanceUIToInternal,
  languages,
  languagesUI,
  languageUIToInternal,
} from '../utils/types/enums';
import { screens } from '.';

export const Settings: ScreenComponent = observer(({ componentId }) => {
  const { ui } = useStores();
  const { nav, t } = useServices();

  // State
  const [appearance, setAppearance] = useState(ui.appearance);
  const [language, setLanguage] = useState(ui.language);
  const dispatch = useAppDispatch();
  const { isLogin, user: userState } = useAppSelector(({ login }) => login);
  const [user, setUser] = useState(userState);
  const [editable, setEditable] = useState(false);

  // Computed
  const unsavedChanges =
    ui.appearance !== appearance || ui.language !== language;

  const appearanceInitialIndex = appearances.findIndex(
    (it) => it === appearance
  );
  const appearanceSegments = appearancesUI.map((it) => ({ label: it }));

  const languageInitialIndex = languages.findIndex((it) => it === language);
  const languageSegments = languagesUI.map((it) => ({ label: it }));

  // Start
  useEffect(() => {
    screens.N.mergeOptions(componentId, {
      topBar: {
        rightButtons: unsavedChanges ? [navButtons.save] : [],
      },
    });
  }, [componentId, unsavedChanges]);

  // Methods
  const handleAppearanceIndexChange = (index: number) =>
    setAppearance(appearanceUIToInternal[appearancesUI[index]]);
  const handleLanguageIndexChange = (index: number) =>
    setLanguage(languageUIToInternal[languagesUI[index]]);

  const handleSave = () => {
    ui.setMany({
      appearance,
      language,
    });

    nav.handleUIOptionsChange();
  };
  useNavigationButtonPress(handleSave, componentId, navButtons.save.id);

  const onPress = () => {
    if (isLogin) {
      return dispatch(logout());
    }
    return screens.show('Login');
  };

  const handleSaveData = () => {
    dispatch(
      editData({
        user: user,
      })
    );
  };

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
        {user && (
          <View>
            <View
              style={{
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={iOSUIKit.title3Emphasized}>Profile</Text>
              <TouchableOpacity
                onPress={() => {
                  setEditable((state) => !state);
                  userState && handleSaveData();
                }}
                style={styles.editButton}
              >
                <Text style={styles.text}>{editable ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 25,
              }}
            >
              <View>
                <Text style={iOSUIKit.subhead}>Email</Text>
                <TextInput
                  value={user?.email}
                  editable={false}
                  placeholder='email'
                  style={styles.input}
                  onChangeText={(text: any) =>
                    setUser((currentVal: any) => ({
                      ...currentVal,
                      email: text,
                    }))
                  }
                />
              </View>
              <View>
                <Text style={iOSUIKit.subhead}>First Name</Text>
                <TextInput
                  value={user?.firstName}
                  editable={editable}
                  placeholder='First Name'
                  style={styles.input}
                  onChangeText={(text: any) =>
                    setUser((currentVal: any) => ({
                      ...currentVal,
                      firstName: text,
                    }))
                  }
                />
              </View>
              <View>
                <Text style={iOSUIKit.subhead}>Last Name</Text>
                <TextInput
                  value={user?.lastName}
                  editable={editable}
                  placeholder='Last Name'
                  style={styles.input}
                  onChangeText={(text: any) =>
                    setUser((currentVal: any) => ({
                      ...currentVal,
                      lastName: text,
                    }))
                  }
                />
              </View>
              <View>
                <Text style={iOSUIKit.subhead}>Gender</Text>
                <RadioGroup
                  initialValue={true}
                  onValueChange={(value: boolean) => {
                    setUser({ ...user, gender: value });
                  }}
                  style={styles.radio}
                >
                  <View style={styles.radioInput}>
                    <RadioButton
                      value={false}
                      label={'Female'}
                      color={colors.blue}
                      disabled={!editable}
                    />
                  </View>
                  <View style={styles.radioInput}>
                    <RadioButton
                      value={true}
                      label={'Male'}
                      color={colors.blue}
                      disabled={!editable}
                    />
                  </View>
                </RadioGroup>
              </View>
            </View>
          </View>
        )}

        <Section title={'UI'}>
          <View paddingV-s1>
            <Row>
              <View flex>
                <Text textColor text60R>
                  Appearance
                </Text>
              </View>

              <SegmentedControl
                initialIndex={appearanceInitialIndex}
                segments={appearanceSegments}
                backgroundColor={Colors.bgColor}
                activeColor={Colors.primary}
                inactiveColor={Colors.textColor}
                onChangeIndex={handleAppearanceIndexChange}
              />
            </Row>
          </View>

          <View paddingV-s1>
            <Row>
              <View flex>
                <Text textColor text60R>
                  Language
                </Text>
              </View>

              <SegmentedControl
                initialIndex={languageInitialIndex}
                segments={languageSegments}
                backgroundColor={Colors.bgColor}
                activeColor={Colors.primary}
                inactiveColor={Colors.textColor}
                onChangeIndex={handleLanguageIndexChange}
              />
            </Row>
            <Button onPress={onPress}>
              {isLogin ? t.do('settings.logout') : t.do('login.button')}
            </Button>
          </View>
        </Section>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  radio: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioInput: {
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    color: colors.blue,
  },
  editButton: {
    borderColor: colors.blue,
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    padding: 6,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
  },
  profile: {
    position: 'absolute',
  },
});
