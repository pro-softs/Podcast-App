import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CommentRow from "../customRow/commentRow";
import { Map } from "immutable";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
});
renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
};

const CommentListview = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
                data={itemList}
                extraData={Map(itemList)}
                renderItem={({ item, index }) => <CommentRow
                    comment={item.comment}
                    userName={item.userName}
                    userPic={item.userPic}
                    userId={item.userId}
                    podcastId={item.podcastId}
                    index={index}
                />}
            />

    </View>
);

export default CommentListview;