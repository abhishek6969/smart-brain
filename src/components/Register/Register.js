import React,{ Component } from "react";

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      name : ''
    }
  }
  onNameChange = (event)=>{
    this.setState({name : event.target.value})
  }
  onEmailChange = (event)=>{
    this.setState({email : event.target.value})
  }
  onPasswordChange = (event)=>{
    this.setState({password : event.target.value})
  }
  onSubmit = ()=>{
    fetch('https://immense-peak-41022.herokuapp.com/register',{
      method : 'post',
      headers : {'content-type' : 'application/json'},
      body : JSON.stringify({
        email : this.state.email,
        password : this.state.password,
        name : this.state.name,
      })
    })
    .then(res=>res.json())
    .then(user=>{
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    });
  }
  render(){
    const { onRouteChange } = this.props;
    return(
      <article className="br3 ba mv4 w-100 w-50-m w-25-l mw7 center shadow-5">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" >First Name</label>
                <input 
                onChange={this.onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type='text' 
                name="fname"  
                id="fname"/>
              
                <label className="db fw6 lh-copy f6" >Email</label>
                <input 
                onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" >Password</label>
                <input 
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" 
                name="password" 
                id="password"/>
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
            </fieldset>
            <div className="">
              <input 
              onClick={this.onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
              type="submit" 
              value="Register"/>
            </div>
            <div className="lh-copy mt3">
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Register;