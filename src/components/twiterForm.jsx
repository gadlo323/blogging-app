import React from 'react'
import "../dataBase.js";
import './twiterForm.css'
import { css } from "@emotion/react";
import { HashLoader} from "react-spinners";
import { v4 as uuidv4 } from 'uuid';
import { getUser } from '../dataBase.js';
const override = css`
position: fixed;
top:30%;
left:46%;
  border-color: red;
`;
class TwiterForm extends  React.Component{
  
    constructor(props){
        super(props);
         this.state={
            content:"",
            active : false,
            disabled:false,
            loading: false,
            newTweet:'',
         }
    }
    onChange(e){
        if(e.target.value.length <= 140)
        this.setState({content : e.target.value, disabled:false, active:false})
        else this.setState({disabled:true, active:true})

    }

  async  onSubmit(event){
    
         event.preventDefault();
         this.setState({loading:true,disabled:true});
         const user = await getUser();
         const twitee = {
         id: uuidv4(),
         content: this.state.content,
         userName:  user ? user :'null',
         date: new Date().toISOString()
         };
         this.props.onNewTwitee(twitee);
         setTimeout(()=>{
          this.setState({content: "",loading:false,disabled:false});
         },2000)
    }


    render(){
      
            return(
                <div className="twitte">
                    
                     <div className="wreppar-top">
                         <form className="twitte-form" onSubmit={(event)=> this.onSubmit(event)}>
                             <div className="top-form">
                                 <textarea className="twitee-field" rows="5" cols="10" placeholder=
                                 "What you have in mind..."  value={this.state.content} onChange={(e)=> this.onChange(e)} required></textarea> 
                            </div>
                             <div className="bottom-form">
                                 <div className={this.state.active?"eroor-field":"remove"}>
                                     <p className="error">The tweet can't contain more then 140 chars.</p>
                                 </div>
                                 <button type="submit" className="submit-twitee" disabled={this.state.disabled}>Tweet</button>
                             </div>
                         </form>
                     </div>    
                  <HashLoader
                   css={override}
                   size={100}
                   color={"#123abc"}
                   loading={this.state.loading}
                  />
                </div>
            )
    }
}

export default TwiterForm;