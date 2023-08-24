import { View, StyleSheet, FlatList } from "react-native";
import { Post } from "../components/Post";

export const PostList = ({ data, navigation }) => {
  const onOpen = (post) => {
    navigation.navigate("PostScreen", { postId: post.id, date: post.date });
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen}/>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});
