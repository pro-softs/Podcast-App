import { Button, Container, Content, Form, Icon, Input, Item, Text, View } from "native-base";
// import { BlurView } from "react-native-blur";
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, ImageBackground, Keyboard, ToastAndroid, 
  TouchableWithoutFeedback, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../actions/login";

import styles from "./styles";

const mapStateToProps = (state) => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
  isError: state.login.isError,
  msg: state.login.msg
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(loginActions, dispatch)
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      passwd: "",
      alreadyLoggedin: false,
      isError: true
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("alreadyLoggedIn").then((data) => {
      if (data) { this.props.navigation.navigate("AuthNavigator"); }
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn) {
      AsyncStorage.multiSet([
        ["alreadyLoggedIn", "true"]
      ]).then(
        () => newProps.navigation.navigate("AuthNavigator")
      );
    } else if (this.props.isError) {
      this.setState({ isError: true });
    }
  }

  hideError = () => {
    this.setState({ isError: false });
  }

  login = (e) => {
    this.props.navigation.navigate("Podcasts", {'data': {}});
  };

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.imageContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/logoHorizontal.png')}
                style={{ alignSelf: "center" }}
                />
            </View>
            
            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
              <Form>
                <Item regular style={styles.textInputBox}>
                  <Input
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor="rgba(0,0,0,.2)"
                      blurOnSubmit={false}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.passwordInput._root.focus();
                      }}
                      onChangeText={(uname) => this.setState({ username: uname })}
                      value={this.state.username}
                      style={{ fontFamily: 'lato', color: "#000", fontSize: 14 }}
                    />
                </Item>
                <Item regular style={styles.textInputBox}>
                  <Input
                      secureTextEntry={true}
                      placeholder="Password"
                      placeholderTextColor="rgba(0,0,0,.2)"
                      ref={(input) => {
                        this.passwordInput = input;
                      }}
                      onChangeText={(pwd) => this.setState({ passwd: pwd })}
                      value={this.state.passwd}
                      style={{ fontFamily: 'lato', 
                       color: "#000", fontSize: 14 }}
                    />
                </Item>
                <Button
                  transparent
                  block
                  onPress={() => this.props.navigation.navigate("")}
                  style={{ width: "55%" }} >
                  <Text style={{ fontFamily: 'lato', textAlign: "left", color: "rgba(137,131,255,1)", fontSize: 12 }}>
                    Forgot Password?
                  </Text>
                </Button> 
              </Form>                           
            </View>
            
            <Button color="rgba(86,79,202,1)" full style={{ marginLeft: 25, marginRight: 25, 
              marginBottom: 15,
              marginTop: 50, 
              borderRadius:10, borderWidth: 1, height: 54 }} onPress={(e) => this.login(e)}>
              <Text style={{ fontFamily: 'lato', color: "#ffffff" }}>LOGIN</Text>
            </Button>
            </View>
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
