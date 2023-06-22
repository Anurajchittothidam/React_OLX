import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../Firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const AdsListContext = createContext([]);

export const AdsListContextProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [productDetail,setProductDetail] = useState({})

  function viewProductDetail (ad){
    console.log(ad, "ad")
    if (ad) {
      setProductDetail(ad)
    }
  }

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const collectionRef = collection(db, "ads")
        const querySnapshot = await getDocs(collectionRef);
        const fetchedAds = [];
        querySnapshot.forEach((doc) => {
          fetchedAds.push({ id: doc.id, ...doc.data() });
        });
        setAds(fetchedAds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAds();
  }, [ads]);

  return (
    <AdsListContext.Provider value={{ads, productDetail, viewProductDetail}}>
      {children}
    </AdsListContext.Provider>
  );
};

export const useAdsList = () => useContext(AdsListContext);