import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, clearFavouritesFromFirebase, db, removeFavouriteFromFirebase } from "../../auth/firebase";
import { collection, getDocs } from "firebase/firestore";

// This is initialisation of favourites from local storage
// commented, since we are using firebase database now

// const favourites = localStorage.getItem('favourites')!==null?JSON.parse(localStorage.getItem('favourites')):[]


export const favouriteSlice = createSlice({
    name:'favourites',
    initialState:{
        favourites:[],
        isLoading:true
    },
    reducers:{
        addFavourite:(state,action)=>{
            // The line below is not necessary but can be useful as a check to see if localStorage favourite already exists 
            if(state.favourites.some(fav=>fav===action.payload))state.favourites=[...state.favourites]
            state.favourites=[...state.favourites,action.payload]
            // localStorage.setItem('favourites',JSON.stringify(state.favourites))
            const user = auth.currentUser
            if(user){
                addFavouriteToFirebase(user.uid,action.payload);
            }
        },
        removeFavourite(state,action){
            const newArray =[...state.favourites]
            newArray.splice(newArray.findIndex(e=>e===action.payload),1)
            state.favourites=[...newArray]
            // localStorage.setItem('favourites',JSON.stringify(state.favourites));
            const user = auth.currentUser
            if(user){
                removeFavouriteFromFirebase(user.uid,action.payload)
            }
        },
        clearFavourites(state,action){
            // localStorage.removeItem('favourites')
            state.favourites=[]
            const user = auth.currentUser;
            if (user) {
                 clearFavouritesFromFirebase(user.uid);
            }
        },
        isLoading(state,action){
            state.isLoading=action.payload;
        },
        getFavourites(state,action){
            state.favourites=action.payload;
        }
    }
});
export const getFavouritesFromSource = () => async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
      const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
      const favourites = q.docs.map((doc) => doc.data().name);
      dispatch(getFavourites(favourites));
      dispatch(isLoading(false));
    }
  };
  

export const {addFavourite,removeFavourite,clearFavourites,isLoading,getFavourites}=favouriteSlice.actions

export default favouriteSlice.reducer;