import React,{ useContext, createContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db} from "../Firebase/config";
const CreateAdContext = createContext();

export const CreateAdContextProvider = ({ children }) => {
    const createNewAds = async (user, name, category, price, image) => {
        try {
        const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      const date=Date()
      const adData = {
        name,
        category,
        price,
        userId: user.uid,
        imageUrl,
        createdAt:date
      };
      const adsCollectionRef = collection(db, "ads");
      await addDoc(adsCollectionRef, adData);
    } catch (err) {
    throw err;
  }
    };
  
  return (
    <CreateAdContext.Provider value={{createNewAds}}>
      {children}
    </CreateAdContext.Provider>
  );
};

export function useCreateAd() {
  return useContext(CreateAdContext);
}
