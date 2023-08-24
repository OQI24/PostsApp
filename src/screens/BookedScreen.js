import { useSelector } from "react-redux";
import { PostList } from "../components/PostList";

export const BookedScreen = ({ navigation }) => {
    const { bookedPosts } = useSelector((state) => state.posts);
    return <PostList data={bookedPosts} navigation={navigation} />;
};
