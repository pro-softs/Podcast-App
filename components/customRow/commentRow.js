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
        height: 50,
        width: 50,
    },
});

const CommentRow = ({ comment, userName, userPic, userId, podcastId, index  }) => (
    <View style={styles.container}>
    <Image source={require('../../assets/user.png')} style={styles.photo} />
    <View style={styles.container_text}>
        <Text style={styles.title}>
            {userName}
        </Text>
        <Text style={styles.description}>
            {comment}
        </Text>
    </View>

    </View>
);

export default CommentRow;