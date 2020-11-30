
import { TwitteItem } from './twiteeItem.jsx';
import './TwiteeList.css'
function TwiteeList(props){
        return(
            <div className="all-twitees">
            <ul className="list-twitees">
                {props.Twittes.map((item) =>(
                    <TwitteItem key={item.id} user={item.user} text={item.text} createdAt={item.createdAt}/>
                ))}
            </ul>
         </div>
        );
}

export default TwiteeList