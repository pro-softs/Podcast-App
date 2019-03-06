import { Platform, Dimensions } from "react-native";

import variable from "./../variables/platform";
import themeVariable from "./../variables/custom";

const deviceHeight = Dimensions.get("window").height;
export default (variables = variable) => {
  const theme = {
    flex: 1,
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
    backgroundColor: themeVariable.themeWhiteColor
  };

  return theme;
};
