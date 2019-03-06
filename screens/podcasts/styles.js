const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  textInputBox: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: "rgba(0,0,0,.5)",
    borderRadius: 3,
    marginBottom: 14,
  },
  inputBlur: {
    position: "absolute"
  },
  logoContainer: {
    flex: 1,
    minHeight: 200,
    paddingTop: deviceHeight / 12,
    paddingBottom: 30
  },
  container: {
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    paddingTop:50 //this amount should be equal to the header height so that any items displayed inside the container will start after the absolute positioned header
  },

  center: {
      alignSelf: 'center',
      justifyContent:"flex-start",
      alignItems: 'center',
      position:"absolute",
      top:0
  }
};
