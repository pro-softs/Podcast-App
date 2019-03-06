import { Button, Container, Content, Form, Icon, Input, Item, Text, View } from "native-base";
// import { BlurView } from "react-native-blur";
import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";


import styles from "./styles";

class Splash extends Component {
  constructor(props) {
    super(props);

    setTimeout(() => {this.props.navigation.navigate("Login", {'data': {}})}, 2000);
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.circlesContainer}>
            <TouchableOpacity style={styles.circle_1} />
            <TouchableOpacity style={styles.circle_2} />
            <TouchableOpacity style={styles.circle_3} />
            <Image
                source={require('../../assets/logoform.png')}
                style={styles.center}
            />
        </View>
      </Container>
    );
  }
}

export default Splash;