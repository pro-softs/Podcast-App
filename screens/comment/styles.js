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
        backgroundColor: "rgba(255,255,255,.5)",
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
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    circlesContainer:{
        width: 250,
        height: 250,
        alignItems: 'center',
    },
    circle_1:{
        top:0,
        position: 'absolute',
        width:250,
        height:250,
        borderRadius: 250/2,
        borderWidth: 2,
        borderColor: 'rgba(97,203,143,0.2)'
    },
    circle_2:{
        top:250*0.1, // The amount remaining
        left:250*0.1,
        position: 'absolute',
        width:250*0.8, // 80% of the base size
        height:250*0.8,
        borderWidth: 2,
        borderRadius: 250/2,
        borderColor: 'rgba(97,203,143,0.5)'
    },
    circle_3:{
        top:250*0.2,
        left:250*0.2,
        position: 'absolute',
        width:250*0.6,
        height:250*0.6, // 60% of the base size
        borderRadius: 250*0.6/2,
        borderWidth: 2,
        borderColor: 'rgba(97,203,143,1)'
    },
    center: {
        top:250*0.3,
        left:250*0.3,
        position: 'absolute',
        width:250*0.4,
        height:250*0.4, // 60% of the base size
    }
};
