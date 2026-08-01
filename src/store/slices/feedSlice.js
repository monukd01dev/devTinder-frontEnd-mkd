import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [], // Array is better for maps and lengths
    reducers: {
        // Naya data aane pe purane state me jodne ke liye (Pagination)
        addFeed: (state, action) => {
            // Hum yahan spread operator use kar rahe hain taaki purana data na ude
            return [...state, ...action.payload];
        },
        
        // Jab user swipe kare (Left/Right), toh usko array se hatane ke liye
        removeUserFromFeed: (state, action) => {
            const userIdToRemove = action.payload;
            return state.filter(user => user._id !== userIdToRemove);
        },

        // 🚨 NAYA ACTION: Rollback ke liye
        restoreUserToFeed: (state, action) => {
            // Action payload me poora User Object aayega
            // Hum isko wapas array ke starting (0th index) me daal denge
            state.unshift(action.payload); 
        },

        // Jab user logout kare, tab sab clear karne ke liye
        clearFeed: () => {
            return [];
        }
    }
})

export const { addFeed, removeUserFromFeed, restoreUserToFeed,clearFeed } = feedSlice.actions;
export default feedSlice.reducer;