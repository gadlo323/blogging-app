import React from 'react'
import "../dataBase.js";
import { getUser, saveUser } from '../dataBase.js';
import './profile.css'
class Profile extends  React.Component{
 
    constructor(props){
        super(props);
         this.state={
            userName:"",
         }
    }

  async  componentDidMount(){
        let user = await getUser();
        if(user) this.setState({userName:user})
    }
    onChange(e){
        this.setState({userName : e.target.value})
    }

    onSubmit(event){
        event.preventDefault();
        saveUser(this.state.userName)
        this.setState({userName :""})
    }



    render(){
        return(
            <div className="profile">
                 <div className="wreppar">
                     <h2>Profile</h2>
                     <form className="profile-form" onSubmit={(event)=> this.onSubmit(event)}>
                         <div className="top-form-profile">
                             <label htmlFor="profile">User Name</label>
                             <input id="profile" className="profile-field" value={this.state.userName} onChange={(e)=> this.onChange(e)} required/>
                         </div>
                         <div className="bottom-form-profile">
                             <button type="submit" className="submit-profile" disabled={this.state.disabled}>Save</button>
                         </div>
                     </form>
                 </div>    
            </div>
        );
    }
}

export default Profile;