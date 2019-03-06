import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CustomRow from "../customRow/customRow";
import { Map } from "immutable";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        marginBottom: 100
    },
});

const CustomListview = ({ itemList, handleLiked, handleSharing, handleComments, startPlaying }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                extraData={Map(itemList)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <CustomRow
                    name={item.name}
                    url={item.url}
                    liked={item.liked}
                    noOfLikes={item.noOfLikes}
                    noOfComments={item.noOfComments}
                    index={index}
                    handleLiked={handleLiked}
                    startPlaying={startPlaying}
                    handleSharing={handleSharing}
                    handleComments={handleComments}
                />}
            />

    </View>
);

export default CustomListview;