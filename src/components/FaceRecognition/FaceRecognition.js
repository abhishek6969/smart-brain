import React from "react";
import 'tachyons';
import './FaceRecognition.css'

const FaceRecognition = ({imageURL,box})=>{
  return(
    <div className="flex justify-center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageURL} alt="" width='500px' height='auto' />
        <div className="bounding-box style =" style={{top :   box.topRow, right : box.rightCol,bottom : box.bottomRow,left : box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;