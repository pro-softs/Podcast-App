import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 30,
        width: 30,
    },
    icon: {
        height: 20,
        width: 20,
    },
    container_right: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 12,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    container_right_text: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 12
    }
});

const CustomRow = ({ name, url, liked, noOfLikes, noOfComments, index, handleLiked, handleComments,  startPlaying, handleSharing }) => (
    <View style={styles.container}>
        <TouchableOpacity
                onPress={ () => {
                    startPlaying(index);
                } } 
        >
            <Image source={require('../../assets/play.png')} style={styles.photo} />
        </TouchableOpacity>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {name}
            </Text>
            <Text style={styles.description}>
            { ((url).length > 20) ? 
                (((url).substring(0,17)) + '...') : 
                url }
            </Text>
        </View>
        <View style={styles.container_right_text}>
            <TouchableOpacity
                onPress={ () => handleLiked(index, !liked) } 
            >
                {liked? <Image source={require('../../assets/liked.png')} style={styles.icon} /> :
                        <Image source={require('../../assets/like.png')} style={styles.icon} /> }
            </TouchableOpacity>
            <Text style={{...styles.description, alignSelf:'center'}}>
                {noOfLikes}
            </Text>
        </View>
        <View style={{...styles.container_right_text, marginLeft:10  }}>
            <TouchableOpacity
                onPress={ () => handleComments(index) } 
            >
               <Image source={require('../../assets/comment.png')} style={styles.icon} /> 
            </TouchableOpacity>
            <Text style={{...styles.description, alignSelf:'center'}}>
                {noOfComments}
            </Text>
        </View>
        <View style={{...styles.container_right_text, marginLeft:10  }}>
            <TouchableOpacity
                onPress={ () => handleSharing(index) } 
            >
                <Image source={require('../../assets/ic_mail.png')} style={styles.icon} /> 
            </TouchableOpacity>
        </View>
    </View>
);

export default CustomRow;