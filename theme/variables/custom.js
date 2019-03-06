import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

const themeVariables = {
  // Font
  fontThin: Platform.OS === "ios" ? "System" : "Roboto_thin",
  // Colors
  themeWhiteColor: "#000",
  themeBlackColor: "#2f363e",
  inputBackground: "#23282E",
  themeWhiteColortrans: "#ffffff",//"rgba(255,255,255,.05)",
  themeWhiteColortrans1: "#ffffff",//"rgba(255,255,255,.1)",
  themeWhiteColortrans2: "#ffffff",//"rgba(255,255,255,.2)",
  themeWhiteColortrans3: "#ffffff",//"rgba(255,255,255,.3)",
  themeWhiteColortransNew: "rgba(0,0,0,0.1)",

  themePrimaryColor: "rgba(86,79,202,1)",
  themePrimaryDarkColor: "rgba(86,79,202,1)",
  themePrimaryLightColor: "rgba(86,79,202,0.5)",
  themeTextColor: "#fff",
  themeTextColorLight: "#b9b8bd",
  themeTextColorInverse: "#252627",
  overlayLightColor: "rgba(255,255,255,.1)",
  themeAltColor: "#5ee2ee",


  // Dimensions
  tabBarHeight: 3,
  defaultBorderWidth: 1.25,
  defaultBorderRadius: 4,
  itemPadding: 15
};

themeVariables.inputTextColor = (value) => value ? "#d9d8dd" : "rgba(255,255,255,0.5)";
themeVariables.inputTextWhiteColor = (value) => value ? "#333333" : "#d9d8dd";

export default themeVariables;
