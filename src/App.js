import {React,Component} from 'react'
import Navigation from './components/navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn.js/SignIn';
import Particles from 'react-tsparticles';
import Rank from './rank/rank';
import { op } from './op';

const opt = op;

const initialState = {
  input : '',
  imageURL:'',
  box : {},
  route : 'signin',
  isSigned : false,
  user : {
    id : "",
    name : "",
    email : "",
    entries : 0,
    joined : ''
  }
}


class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }
  loadUser = (anyuser)=>{
    this.setState({user:{
      id : anyuser.id,
      name : anyuser.name,
      email : anyuser.email,
      entries : anyuser.entries,
      joined : anyuser.joined 
    }})
  }
  calculateFaceLocation(data){
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const height = Number(image.height); 
    const width = Number(image.width); 
    return{
      leftCol : face.left_col*width,
      topRow : face.top_row*height,
      rightCol : width-face.right_col*width,
      bottomRow : height-face.bottom_row*width,
    }
  }
  displayFaceBox(b){
    this.setState({box:b})
  }
  onInputChange = (event)=>{
    this.setState({input:event.target.value});
  }
  onSubmit = ()=>{
    this.setState({imageURL:this.state.input})
    fetch('https://immense-peak-41022.herokuapp.com/imageurl',{
      method : 'post',
      headers : {'content-type' : 'application/json'},
      body : JSON.stringify({
        input : this.state.input
      })
    })
    .then(res=>res.json())
    .then(response => {
      if(response){
        fetch('https://immense-peak-41022.herokuapp.com/image',{
          method : 'put',
          headers : {'content-type' : 'application/json'},
          body : JSON.stringify({
            id : this.state.user.id
          })
        })
          .then(res => res.json())
          .then(count =>this.setState(Object.assign(this.state.user,{entries : count})))
          .catch(console.log)//same as .catch(err=>console.log(err))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error=>console.log(error))
    
  }
  onPathChange = (path)=>{
    if(path == 'signout'){
      this.setState(initialState)
    }else if(path == 'home'){
      this.setState({isSigned:true})
    }
    this.setState({route:path})
  }
  
  render(){
    const {isSigned,route,imageURL,box,input} = this.state;
    return (
      <div className="App">
        <Particles className = "particles" options={opt}/>
        <Navigation isSignedIn={isSigned} onRouteChange = {this.onPathChange}/>
        {
          route
           == 'home'?
          (<div>
            <Logo/>
            <Rank 
            name = {this.state.user.name}
            entries = {this.state.user.entries}
            />
            <ImageLinkForm  
            onSubmit = {this.onSubmit} 
            onInputChange = {this.onInputChange}
            />
            <FaceRecognition box = {box} imageURL = {imageURL}/>
          </div>):
          (
            route
             == 'signin'?
            <SignIn loadUser={this.loadUser} onRouteChange = {this.onPathChange}/>:
            <Register loadUser={this.loadUser} onRouteChange={this.onPathChange}/>
          )
        }
      </div>
    );
  }
}

export default App;


