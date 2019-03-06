import { Button, Container, Content, Form, Icon, Input, Item, Text, View, ProgressBar } from "native-base";
// import { BlurView } from "react-native-blur";
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, ImageBackground, Keyboard, ToastAndroid, TouchableOpacity,
   TouchableWithoutFeedback, TouchableHighlight, Platform } from "react-native";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ModalComponent from 'react-native-modal-component';

import styles from "./styles";
import CustomHeader from "../../components/header";
import CustomListview from "../../components/customList/customList";
import {Sound} from 'react-native-sound';
import Mailer from 'react-native-mail';
import TagInput from 'react-native-tag-input';

import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';

const BASE_URL = "https://emtropy-podcast.herokuapp.com";
const uploadUrl =  BASE_URL + "/file";
const createPodcastUrl = BASE_URL + "/create/podcast";

import axios from 'axios';
import fetch from "cross-fetch";
const inputProps = {
  keyboardType: 'default',
  placeholder: 'email',
  autoFocus: true,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

const horizontalInputProps = {
  keyboardType: 'default',
  returnKeyType: 'search',
  placeholder: 'Search',
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};

const horizontalScrollViewProps = {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
};

class Podcasts extends Component {
  constructor(props) {
    console.log("podcast screee");
    super(props);

    this.state = {
      podcasts: [],
      isUploading: false,
      selectedSource: undefined,
      emails: [],
      modalVisible: false,
      indexToShare: undefined, 
      text: ''
    }

    
    this.showModal = this.showModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  startPlaying = (index) => {
    // const sound = new Sound(this.state.podcasts[index].uri, null, (error) => {
    //   if (error) {
    //     // do something
    //   }
      
    //   // play when loaded
    //   sound.play();
    // });
    var url = this.state.podcasts[index].url;
    console.log(url);
    ReactNativeAudioStreaming.play(url, {});
    this.setState({ selectedSource: url})
  }

  renderModalContent() {
    return( 
      <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: 22, padding: 15, backgroundColor:"#fff"}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray'}}>
          <Text>To: </Text>
          <TagInput
            value={this.state.emails}
            onChange={this.onChangeTags}
            labelExtractor={this.labelExtractor}
            text={this.state.text}
            onChangeText={this.onChangeText}
            tagColor="blue"
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={200}
          />          
        </View>
        <Button color="rgba(86,79,202,1)" full style={{ marginLeft: 25, marginRight: 25, 
              marginBottom: 15,
              marginTop: 50, 
              borderRadius:10, borderWidth: 1, height: 54 }} onPress={() => this.sendEmail()}>
              <Text style={{ fontFamily: 'lato', color: "#ffffff" }}>SHARE</Text>
          </Button>
      </View>
    );
  }

  componentWillMount() {
    console.log('component mount');
    this.setState({isUploading: true});
    axios.get(BASE_URL + '/podcasts')
      .then(response => this.setState({podcasts:response.data.podcasts, isUploading: false}));
  }

  componentWillReceiveProps(newProps) {
    
  }

  handleLiked = (index, liked) => {
    var podcasts = this.state.podcasts;
    podcasts[index].liked = liked;
    if(liked)
      podcasts[index].noOfLikes += 1;
    else
      podcasts[index].noOfLikes -= 1;

    this.setState({podcasts: podcasts});
  }

  handleSharing = (index) => {
    this.setState({ indexToShare: index });
    this.showModal();
  }

  sendEmail = () =>{
    this.dismissModal();
    var emails = this.state.emails;
    var url = this.state.podcasts[this.state.indexToShare].url;
    Mailer.mail({
      subject: 'A new Podcast is shared',
      recipients: emails,
      body: 'Listen to the podcast here ' + url,
      isHTML: false,
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  handleComment = (index) => {
    var podcasts = this.state.podcasts;
    console.log(podcasts[index]._id);

    this.props.navigation.navigate('CommentScreen', {'podcastId': podcasts[index]._id});
  }

  onChangeText = (text) => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        emails: [...this.state.emails, this.state.text],
        text: "",
      });
    }
  }

  showPicker = () => {
    DocumentPicker.show({
        filetype: [DocumentPickerUtil.audio()],
      },(error,res) => {
        // Android
        console.log(
           res.uri,
           res.type, // mime type
           res.fileName,
           res.fileSize,
           res.extension
        );

        this.uploadAudio(res.uri, res.type, res.fileName, res.extension);
      });
  }

  uploadAudio = (uriString, type, fileName, extension) => { 
    const formData = new FormData()
    formData.append('file', {
      uri: uriString,
      name: "podcast." + extension,
      type: type,
    })
    try {
      this.setState({ isUploading: true });
      fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then((response) => {
        return response.json();
      }).then((json) => {        
        console.log(json);
        this.createPodcast(fileName, json.url);
      })
    } catch (err) {
      alert(err)
    }    
  }

  createPodcast = (fileName, url) => {
    try {
      this.setState({ isUploading: true });
      var body =  {
        url: url,
        name: fileName,
        userId: "1"
      };

      fetch(createPodcastUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({
          isUploading: false,
          // Push new comment to state before existing ones
          podcasts: [json.data, ...this.state.podcasts]
        });
      });
    } catch (err) {
      alert(err)
    }   
  }

  showModal = () => {
    this.modal.show();
  }

  dismissModal = () => {
    this.modal.dismiss();
  }

  onChangeTags = (emails) => {
    this.setState({ emails });
  }

  labelExtractor = (tag) => tag;

  render() {
    return (
          <ModalComponent
            ref={(modal) => { this.modal = modal; }}
            title="Enter email address"
            showCloseButton
            content={this.renderModalContent()}
            leftItem={{
              title: 'SHARE',
              layout: 'title',
              onPress: this.sendEmail,
            }}
          >
          <Container style={{ flex: 1, backgroundColor: 'white' }}>
          <CustomHeader
            icon="md-arrow-back"
            title="Podcasts"
            navigation={this.props.navigation} />
            {
              this.state.isUploading ? <ActivityIndicator style={styles.container} size="large" color="#0000ff" /> :
              <CustomListview
                handleLiked={this.handleLiked}
                itemList={this.state.podcasts}
                startPlaying={this.startPlaying}
                handleSharing={this.handleSharing}
                handleComments={this.handleComment}
              />
            }          
            <Player url={this.state.selectedSource} />
            <TouchableOpacity
              style={{
                  borderWidth:1,
                  borderColor:'rgba(0,0,0,0.2)',
                  alignItems:'center',
                  justifyContent:'center',
                  width:70,
                  position: 'absolute',                                          
                  bottom: 10,                                                    
                  right: 10,
                  height:70,
                  backgroundColor:'rgba(86,79,202,1)',
                  borderRadius:100,
                }}
                onPress={ () => this.showPicker() } 
            >
              <Icon name="ios-add"  size={30} style={{fontSize: 30, color: 'white'}} />
            </TouchableOpacity>
          </Container>
        </ModalComponent>
    );
  }
}

export default Podcasts;