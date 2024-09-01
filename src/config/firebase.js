
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDo5qd-wFvivOFWQ69f0m2a-W4Fa5H2tCA",
  authDomain: "chat-app-gs-a34a2.firebaseapp.com",
  projectId: "chat-app-gs-a34a2",
  storageBucket: "chat-app-gs-a34a2.appspot.com",
  messagingSenderId: "991752904091",
  appId: "1:991752904091:web:01bb1907cf5366a58d553e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db =  getFirestore(app);

const SignUp = async (username,email,password) => {
     try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey there! I am using chat app",
            lastSeen:Date.now()
        });
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        });
     } catch (error) {
        console.error(error);
        toast.error(error.code?.split('/')[1]?.split('-').join(" ") || "An error occured");
     }
}

const login = async (email,password) => {
     try{
        await signInWithEmailAndPassword(auth,email,password);
     } catch (error) {
         console.error(error);
         toast.error(error.code?.split('/')[1]?.split('-').join(" ") || "An error occured");
     }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code?.split('/')[1]?.split('-').join(" ") || "An error occured");
    }
}

export {SignUp,login,logout,auth,db};