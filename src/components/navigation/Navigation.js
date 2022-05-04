import React from "react";
import 'tachyons';

const Navigation = ({onRouteChange,isSignedIn})=>{
  if(isSignedIn){
    return(
      <nav className="flex justify-end">
        <p onClick={()=>onRouteChange('signout')} className="f3  link dim black pointer underline pa3 ">Sign Out</p>
      </nav>
    );
  }else{
    return(
      <nav className="flex justify-end">
        <p onClick={()=>onRouteChange('signin')} className="f3  link dim black pointer underline pa3 ">Sign In </p>
        <p onClick={()=>onRouteChange('register')} className="f3  link dim black pointer underline pa3 ">Register</p>
      </nav>
    );
  }

}
export default Navigation;