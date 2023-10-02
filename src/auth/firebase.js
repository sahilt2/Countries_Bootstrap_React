// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLrQaxrJ0P49uCH4gfclnhg1u6xQQYx2I",
  authDomain: "countries-react-42b32.firebaseapp.com",
  projectId: "countries-react-42b32",
  storageBucket: "countries-react-42b32.appspot.com",
  messagingSenderId: "595552744988",
  appId: "1:595552744988:web:9aaa836f914739d529d1d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }
    catch(err){
        console.log(err);
        alert(err.msg)
    }
}

const registerWithEmailAndPassword = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db,'users'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email,
        })
    }
    catch(err){
        console.log(err);
        alert(err.message)

    }
}

const logOut = () =>{
    signOut(auth)
}

export const addFavouriteToFirebase=async(uid,name)=>{
    try{
        await addDoc(collection(db,`users/${uid}/favourites`),{name});
        console.log("favs added to firebase");
    }
    catch(err){
        console.error("Error adding favs to database: ",err);
    }
}

export {auth,db,loginWithEmailAndPassword,registerWithEmailAndPassword,logOut};