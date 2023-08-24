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
import { THEME } from "../theme";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggleBooked } from "../store/reducers/post";

export const PostScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { postId, date } = route.params;
    const post = useSelector((state) =>
        state.post.allPosts.find((post) => post.id === postId)
    );
    console.log("post", post);
    const iconName = post.booked ? "ios-star" : "ios-star-outline";

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
        const drawerNavigation = navigation.getParent();
        console.log(route);
        drawerNavigation.setOptions({
            headerTitle: "Пост от " + new Date(date).toLocaleDateString(),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item
                        title={"Booked"}
                        iconName={iconName}
                        onPress={() => dispatch(toggleBooked(postId))}
                    />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item
                        title={"back"}
                        iconName={"arrow-back"}
                        onPress={drawerNavigation.goBack}
                    />
                </HeaderButtons>
            ),
        });
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
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
