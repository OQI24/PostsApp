import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { DATA } from "../data";
import { THEME } from "../theme";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";


export const PostScreen = ({ navigation, route }) => {
  const { postId, date } = route.params;
  const post = DATA.find((post) => post.id === postId);
  const iconName = post.booked ? 'ios-star' : 'ios-star-outline';

  const removeHandler = () => {
    Alert.alert("Удаление поста", "Вы уверены, что хотите удалить пост?", [
      {
        text: "Отменить",
        style: "cancel",
      },
      {
        text: "Удалить",
        onPress: () => {},
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Пост от " + new Date(date).toLocaleDateString(),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title={'Take photo'} iconName={iconName} onPress={() => console.log('Press photo')}/>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title={"Удалить"}
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "OpenRegular",
  },
});
