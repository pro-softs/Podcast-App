import { Body, Button, Header, Icon, Left, Right, Subtitle, Title } from "native-base";
import React, { Component } from "react";

class CustomHeader extends Component {
    render() {
        return (
            <Header>
                <Left style={{ flex: 1 }}>
                    <Button transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name={this.props.icon} />
                    </Button>
                </Left>
                <Body style={{ flex: 1 }}>
                    <Title style={{ textAlign: "center", fontFamily: 'lato', fontSize: 26 }}>{this.props.title}</Title>
                </Body>
                <Right style={{ flex: 1 }}></Right>
            </Header>
        );
    }
}

export default CustomHeader;
