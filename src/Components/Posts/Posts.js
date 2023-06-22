
import React, { useState } from "react";
import { useAdsList } from "../../Store/productList";
import Heart from "../../assets/Heart";
import "./Post.css";
import { useNavigate } from 'react-router-dom';

function Posts() {
  const navigate = useNavigate();
  const { ads,viewProductDetail} = useAdsList();
  const [isLoading, setIsLoading] = useState(false);


  function clickView(ad) {
    console.log(ad, 'ad');
    viewProductDetail(ad);
    navigate(`/detailedview`);
  }
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        
          {/* {setIsLoading(true)}/// */}
          {isLoading ? (
             <div className="d-flex justify-content-center">
             <div className="spinner-border" role="status">
           </div>
           </div>
          ):(
            <div className="cards">
            {ads.map(ad => (
              <div onClick={(()=>clickView(ad)
                )}
               className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={ad.imageUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {ad.price}</p>
                  <span className="kilometer">{ad.name}</span>
                  <p className="name">{ad.category}</p>
                </div>
              </div>
            ))
              }
            </div>
          )
            
          }
          {/* {setIsLoading(false)} */}
        
      </div>
    </div>
  );
}

export default Posts;

