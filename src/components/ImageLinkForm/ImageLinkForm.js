import React from "react";
import 'tachyons';
import './form.css'

const ImageLinkForm = ({onInputChange,onSubmit})=>{
  return(
    <div>
      <p>
        {`This brain detects faces. Give it a try!`}
      </p>
      <div className="flex justify-center">
        <div className="flex justify-center pa4 br3 shadow-5 grow form">
          <input  className="f4 pa2 w-70 center" type="tex" onChange={onInputChange} />
          <button className="pointer w-30 grow f4 link ph3 dib white bg-light-red"
          onClick={onSubmit}
          >Detect!</button>
        </div>
      </div>
    </div>
  );
}
export default ImageLinkForm;