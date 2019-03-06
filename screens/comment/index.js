import { Button, Container, Content, Form, Icon, Input, Item, Text, View, ProgressBar } from "native-base";
// import { BlurView } from "react-native-blur";
import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity} from "react-native";

import styles from "./styles";
import CustomHeader from "../../components/header";
import CommentListview from "../../components/customList/commentList";
import Axios from "axios";

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const BASE_URL = "https://emtropy-podcast.herokuapp.com";

class CommentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      isLoading: false,
      podcastId: '',
      comment: ''
    }
  }

  componentWillMount() {
    this.setState({isLoading: true});
    var podcastId = this.props.navigation.state.params.podcastId;
    this.setState({podcastId: podcastId});

    Axios.get(BASE_URL + '/comments?podcastId=' + podcastId)
      .then(response => {
        console.log(response.data.data);
        this.setState({comments:response.data.data, isLoading: false})});
  }

  submitComment = (comment) => {
    const { podcastId } = this.state;
    //this._scrollView.scrollTo({ y: 0 });
    
      // Make API call
      var body={
        userId: "1",
        comment: comment,
        userName: "test",
        podcastId: podcastId,
        userPic: ""
      };

      try {
        fetch(BASE_URL + '/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then((response) => {
                  
            return response.json();

        }).then((json) => {
          console.log(json);
            this.setState({
                // Push new comment to state before existing ones
                comments: [json.data, ...this.state.comments],
                comment: ''
            });
        })
      } catch (err) {
        alert(err)
      }   
  };

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: 'white' }}>
        <CustomHeader
          icon="close"
          title="Comments"
          navigation={this.props.navigation} />
          {
            this.state.isLoading ? <ActivityIndicator style={styles.container} size="large" color="#0000ff" /> :
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <CommentListview
                    itemList={this.state.comments}
                /> 
                <Item regular style={styles.textInputBox}>
                  <Input
                      placeholder="Start typing..."
                      placeholderTextColor="rgba(0,0,0,.2)"
                      ref={(input) => {
                        this.passwordInput = input;
                      }}
                      onChangeText={(comment) => this.setState({ comment: comment })}
                      value={this.state.comment}
                      style={{ fontFamily: 'lato', 
                       color: "#000", fontSize: 14 }}
                    />
                    <TouchableOpacity
                        onPress={ () => {
                          if(this.state.comment != '')
                            this.submitComment(this.state.comment)} } 
                    >
                         <Icon name="send" size={30} style={{fontSize: 30}} />
                    </TouchableOpacity>
                </Item>
            </View>
            }
      </Container>
    );
  }
}

export default CommentScreen;