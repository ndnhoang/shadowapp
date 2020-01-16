const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    opacity: 0.6
  },
  drawerTop: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerTop: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 14,
    top: Platform.OS === "android" ? deviceHeight / 17 : deviceHeight / 16,
    resizeMode: "cover"
  },
  drawerText: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 5 : deviceHeight / 4,
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Montserrat-SemiBold',
  },

  menuText: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined,
    justifyContent: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'transparent',
    paddingBottom: 20,
    marginBottom: 20,
  },
  topButtonLayout: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  burgerItems: {
    marginTop: 15,
    fontSize: 24,
  },
  footerButtonLayout: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footerIconMargin: {
    marginHorizontal: 15
  }
};
