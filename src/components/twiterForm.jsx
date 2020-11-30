import React from 'react'
import './twiterForm.css'
import { v4 as uuidv4 } from 'uuid';
class TwiterForm extends  React.Component{
 
    constructor(props){
        super(props);
         this.state={
            twitte:"",
            disabled:false,
         }
    }
    onChange(e){
        if(e.target.value.length <= 140)
        this.setState({twitte : e.target.value, disabled:false})
        else this.setState({disabled:true})

    }

    onSubmit(event){
        event.preventDefault();
        this.setState({id: this.state.id+1})
     const twitee = {
        id: uuidv4(),
        user:'someUser',
        text: this.state.twitte,
        createdAt: new Date().toISOString()
      };
      this.props.onNewTwitee(twitee);
      this.setState({twitte: ""});
    }


    render(){
        return(
            <div className="twitte">
                 <div className="wreppar-top">
                     <form className="twitte-form" onSubmit={(event)=> this.onSubmit(event)}>
                         <div className="top-form">
                             <input className="twitee-field" type="text" placeholder=
                             "What you have in mind..." value={this.state.twitte} onChange={(e)=> this.onChange(e)}/>
                         </div>
                         <div className="bottom-form">
                             <button type="submit" className="submit-twitee" disabled={this.state.disabled}>Tweet</button>
                         </div>
                     </form>
                 </div>
            </div>
        );
    }
}

export default TwiterForm;