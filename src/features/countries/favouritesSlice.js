import { createSlice } from "@reduxjs/toolkit";

const favourites = localStorage.getItem('favourites')!==null?JSON.parse(localStorage.getItem('favourites')):[]

export const favouriteSlice = createSlice({
    name:'favourites',
    initialState:{
        favourites:favourites
    },
    reducers:{
        addFavourites:(state,action)=>{
            // The line below is not necessary but can be useful as a check to see if localStorage favourite already exists 
            if(state.favourites.some(fav=>fav===action.payload))state.favourites=[...state.favourites]
            state.favourites=[...state.favourites,action.payload]
            localStorage.setItem('favourites',JSON.stringify(state.favourites))
        },
        removeFavourite(state,action){
            const newArray =[...state.favourites]
            newArray.splice(newArray.findIndex(e=>e===action.payload),1)
            state.favourites=[...newArray]
        },
        clearFavourites(state,action){
            localStorage.removeItem('favourites')
            state.favourites=[]
        }
    }
})
export const {addFavourites,removeFavourite,clearFavourites}=favouriteSlice.actions

export default favouriteSlice.reducer;