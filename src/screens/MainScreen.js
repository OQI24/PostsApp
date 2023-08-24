import { useEffect } from "react";
import { PostList } from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../store/reducers/post";

export const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.posts);
    const allPosts = state.allPosts;
    console.log('state', state);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    return <PostList data={allPosts} navigation={navigation} />;
};
