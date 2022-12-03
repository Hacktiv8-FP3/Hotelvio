import { gestureHandlerRootHOC as withGestureHandler } from 'react-native-gesture-handler';
import { generateRNNScreens } from 'rnn-screens';

import { withBottomTab } from '../services/navigation/options';
import { withAppearance } from '../utils/hooks';
import { withRedux } from '../utils/providers';
import { Booking } from './booking';
import { FavoriteScreen } from './favorites-screen';
import { History } from './history';
import { HistoryDetail } from './history-detail';
import { HotelDetail } from './hotel-detail';
import { Login } from './login';
import { Main } from './main';
import { Settings } from './settings';

export const screens = generateRNNScreens(
  {
    Main: {
      component: Main,
      options: {
        ...withBottomTab('Main', 'home'),
      },
    },
    Favorites: {
      component: FavoriteScreen,
      options: {
        // topBar: { title: { text: 'Favorites' } },
        ...withBottomTab('Favorites', 'heart'),
      },
    },
    Login: {
      component: Login,
      options: {
        topBar: {
          largeTitle: { visible: false },
          scrollEdgeAppearance: {
            active: true,
            noBorder: true,
          },
        },
      },
    },
    HotelDetail: {
      component: HotelDetail,
      options: {
        topBar: { largeTitle: { visible: false } },
        bottomTabs: { visible: false },
      },
    },
    History: {
      component: History,
      options: {
        ...withBottomTab('History', 'time'),
      },
    },
    HistoryDetail: {
      component: HistoryDetail,
      options: {
        bottomTabs: { visible: false },
      },
    },
    Settings: {
      component: Settings,
      options: {
        // title is set in services/navigation/index.ts::configureTitleTranslations
        ...withBottomTab('Settings', 'settings'),
      },
    },
    Booking: {
      component: Booking,
      options: {
        topBar: { largeTitle: { visible: false } },
        bottomTabs: { visible: false },
      },
    },
  },
  [withRedux, withGestureHandler, withAppearance]
);
