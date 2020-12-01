import {ListTweets} from '../conteaxts/listTweets.js'
import { TwitteItem } from './twiteeItem.jsx';
import './TwiteeList.css'
function TwiteeList(){
    return(
    <ListTweets.Consumer>
     {(context)=>{
         return(
            <div className="all-twitees">
            <ul className="list-twitees">
                { context.twittes.map((item) =>(
                    <TwitteItem key={item.id} user={item.userName} text={item.content} createdAt={item.date}/>
                ))}
            </ul>
         </div>  
         )
     }}
    </ListTweets.Consumer>
    );
}

export default TwiteeList