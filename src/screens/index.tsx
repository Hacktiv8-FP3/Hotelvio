import { generateRNNScreens } from 'rnn-screens';
import { gestureHandlerRootHOC as withGestureHandler } from 'react-native-gesture-handler';

import { Main } from './main';
import { Settings } from './settings';

import { withBottomTab } from '../services/navigation/options';
import { Sample } from './_screen-sample';
import { Playground } from './playground';
import { withAppearance } from '../utils/hooks';
import { withRedux } from '../redux/Provider';
import { LoginScreen } from './login-screen';
import { HotelDetail } from './hotel-detail';
import { FavoriteScreen } from './favorites-screen';

export const screens = generateRNNScreens(
  {
    Main: {
      component: Main,
      options: {
        ...withBottomTab('Main', 'home'),
      },
    },
    Playground: {
      component: Playground,
      options: {
        topBar: { title: { text: 'Playground' } },
        ...withBottomTab('Playground', 'construct'),
      },
    },
    Booked: {
      component: LoginScreen,
      options: {
        topBar: { title: { text: 'Booked' } },
        ...withBottomTab('Booked', 'construct'),
      },
    },
    Favorites: {
      component: FavoriteScreen,
      options: {
        // topBar: { title: { text: 'Favorites' } },
        ...withBottomTab('Favorites', 'construct'),
      },
    },
    Login: {
      component: LoginScreen,
    },
    Detail: {
      component: HotelDetail,
    },
    Settings: {
      component: Settings,
      options: {
        // title is set in services/navigation/index.ts::configureTitleTranslations
        ...withBottomTab('Settings', 'settings'),
      },
    },

    Sample: {
      component: Sample,
      options: {
        topBar: {
          title: { text: 'Sample' },
        },
      },
    },
  },
  [withRedux, withGestureHandler, withAppearance]
);
