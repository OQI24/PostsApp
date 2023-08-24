import { createSlice } from "@reduxjs/toolkit";
import { DATA } from "../../data";

export const postReducer = createSlice({
    name: "posts",
    initialState: {
        allPosts: [],
        bookedPosts: [],
    },
    reducers: {
        loadPosts: (state) => {
            state = {
                allPosts: state.allPosts.length ? state.allPosts : DATA,
                bookedPosts: state.bookedPosts.length ? state.bookedPosts : DATA.filter((post) => post.booked),
            };
            console.log('state.allPosts', state.allPosts);
        },
        toggleBooked: (state, action) => {
            const { allPosts } = state;
            console.log("action", action.payload);
            state.allPosts = allPosts.map((post) => {
                if (post.id === action.payload) {
                    post.booked = !post.booked;
                }
            });
            state.bookedPosts = allPosts.filter((post) => post.booked);
            console.log("state", state);
        },
    },
});

export const { loadPosts, toggleBooked } = postReducer.actions;

export default postReducer.reducer;
