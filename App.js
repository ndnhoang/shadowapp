import React from 'react'
import { Root } from 'native-base'
import { Dimensions } from 'react-native'
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation"
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import Firebase from 'react-native-firebase';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import DrawerContent from '@Component/Menu/Left';

import PublicIntro from '@Screen/Public/Intro';
import PublicHome from '@Screen/Public/Home';
// import PublicFeatures from '@Screen/Public/Features';
// import PublicGames from '@Screen/Public/Games';
// import PublicBlog from '@Screen/Public/Blog';
// import PublicNews from '@Screen/Public/News';
import PublicAboutUs from '@Screen/Public/AboutUs';
import PublicContact from '@Screen/Public/Contact';
import PublicSettings from '@Screen/Public/Settings';
import PublicHelp from '@Screen/Public/Help';
// import PublicLocations from '@Screen/Public/Locations';

import PublicSceneAR from '@Screen/Public/SceneAR';
import PublicSceneVR from '@Screen/Public/SceneVR';
import PublicSceneARFilterEditor from '@Screen/Public/SceneAR/ARFilterEditor';

import NavigationService from '@Service/Navigation';

const deviceWidth = Dimensions.get("window").width;

const store = configureStore();

const Drawer = createDrawerNavigator(
  {
    PublicHome: {
      screen: gestureHandlerRootHOC(PublicHome),
    },
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    headerMode: "none",
    initialRouteName: "PublicHome",
    drawerWidth: deviceWidth - 125,
    drawerPosition: 'right'
  }
)

const AppSplash = createStackNavigator(
  {
    PublicIntro: {
      screen: PublicIntro
    }
  },
  {
    headerMode: "none",
    initialRouteName: "PublicIntro",
    initialRouteParams: {
      use360: true
    }
  }
)

const AppNav = createStackNavigator(
  {
    // PublicIntro: {
    //   screen: PublicIntro
    // },
    PublicAboutUs: {
      screen: PublicAboutUs
    },
    PublicContact: {
      screen: PublicContact
    },
    PublicSettings: {
      screen: PublicSettings
    },
    PublicHelp: {
      screen: PublicHelp
    },

    // PublicSceneAR: {
    //   screen: PublicSceneAR
    // },
    // PublicSceneARFilterEditor: {
    //   screen: PublicSceneARFilterEditor
    // },

    Drawer: {
      screen: Drawer
    }
  },
  {
    headerMode: "none",
    mode: 'modal',
    initialRouteName: "Drawer"
  }
)

const ARStack = createStackNavigator(
  {
    PublicSceneAR: {
      screen: gestureHandlerRootHOC(PublicSceneAR)
      // screen: PublicSceneAR
    },
    PublicSceneARFilterEditor: {
      screen: PublicSceneARFilterEditor
    }
  },
  {
    headerMode: "none",
    mode: 'modal',
    initialRouteName: "PublicSceneAR"
  }
)

const VRStack = createStackNavigator(
  {
    PublicSceneVR: {
      screen: PublicSceneVR
    }
  },
  {
    headerMode: "none",
    mode: 'modal',
    initialRouteName: "PublicSceneVR"
  }
)

const SwitcherApp = createSwitchNavigator(
  {
    AppSplash: AppSplash,
    AppNav: AppNav,
    ARStack: ARStack,
    VRStack: VRStack
  },
  {
    initialRouteName: "AppSplash",
  }
)

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.config().enableDeveloperMode();
  }

  render() {
    return (
      <Root>
        <Provider store={store} >
          <SwitcherApp ref={(r) => { NavigationService.setTopLevelNavigator(r) }} />
        </Provider>
      </Root>
    );
  }
}
