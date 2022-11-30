import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Dimensions } from 'react-native';
import {
  Text,
  View,
  SegmentedControl,
  Colors,
  RadioButton,
  RadioGroup,
} from 'react-native-ui-lib';
import { ScreenComponent } from 'rnn-screens';
import { observer } from 'mobx-react';

import { Section } from '../components/section';
import { Row } from '../components/row';
import {
  appearances,
  appearancesUI,
  appearanceUIToInternal,
  languages,
  languagesUI,
  languageUIToInternal,
} from '../utils/types/enums';
import { useStores } from '../stores';
import { screens } from '.';
import { navButtons } from '../services/navigation/buttons';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { useServices } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { editData, logout } from '../redux/user';
import { Button } from '../components/button';
import { RootState } from '../redux/reducer';
import { colors } from '../utils/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { iOSUIKit } from 'react-native-typography';

export const Settings: ScreenComponent = observer(({ componentId }) => {
  const { ui } = useStores();
  const { nav } = useServices();

  // State
  const [appearance, setAppearance] = useState(ui.appearance);
  const [language, setLanguage] = useState(ui.language);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.login);
  const [user, setUser] = useState(state.user);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!state.isLogin) {
      screens.push(componentId, 'Login', { type: 'push' });
    }
  }, [state]);

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

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSaveData = () => {
    dispatch(editData(user));
  };

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior='always'>
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
                state && handleSaveData();
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
                value={user.email}
                editable={editable}
                placeholder='email'
                style={styles.input}
                onChangeText={(text: any) =>
                  setUser((currentVal: any) => ({ ...currentVal, email: text }))
                }
              />
            </View>
            <View>
              <Text style={iOSUIKit.subhead}>First Name</Text>
              <TextInput
                value={user.firstName}
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
                value={user.lastName}
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
                onValueChange={(value: any) => {
                  console.log(value);
                  setUser((user: Boolean) => ({ ...user, gender: value }));
                  console.log(user);
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
            <Button onPress={handleLogout}>Logout</Button>
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
