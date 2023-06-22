import { createContext,useContext,useState,useEffect } from "react";
import {db,auth} from '../Firebase/config'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext= createContext()


export function AuthContextProvider({children}){
    const [user,setUser]=useState({})
    const [fireError,setFireError]=useState('')

    async function signUp(email,password,userName,phoneNumber){
        try{
            const {user}=await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(user,{displayName:userName}).catch((err)=>{
                console.log('errCode',err.code)
                if(err.code==='auth/invalid-password'){
                    setFireError("Incorrect password")
                }else if(err.code==='auth/email-already-in-use'){
                    setFireError("This email is alredy in use")
                }
                return false
            })
            await setDoc(doc(db,'users',user.uid),{
                userId:user.uid,
                username:userName,
                phone:phoneNumber
            })
        }catch(err){
            console.log('errCode',err.code)
            if(err.code==='auth/invalid-password'){
                setFireError("Incorrect password")
            }else if(err.code==='auth/email-already-in-use'){
                setFireError("This email is alredy in use")
            }else{
             setFireError(err.code)
            }
            return false
        }
    }

    function signIn(email,password){
        try{
            return signInWithEmailAndPassword(auth,email,password)
        }catch(err){
            console.log(err.code)
            if(err.message==='Firebase: Error (auth/wrong-password)'){
                setFireError("Password is incorrect")
            }else if(err.code==='auth/user-not-found'){
                setFireError("This email not found")
            }else{
                setFireError(err.code)
            }
        }
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return()=>{
            unsubscribe()
        }
    })

    return(
        <AuthContext.Provider value={{signUp,signIn,logOut,user,fireError}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}