const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  inputBlur: {
    position: "absolute"
  },
  logoContainer: {
    flex: 1,
    minHeight: 200,
    paddingTop: deviceHeight / 12,
    paddingBottom: 30
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textInputBox: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderLeftWidth: 0,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 0,
    marginBottom: 15,
  }
};
