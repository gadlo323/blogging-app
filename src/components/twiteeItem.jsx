import './twiteeItem.css'


export const TwitteItem = (props)=>{
    const {user, text,createdAt} = props;
    return(
        <li className="twitte-item">
        <div className="top">
            <span>{user}</span>
            <span>{createdAt}</span>
        </div>
         <div className="bootom">
            <p>{text}</p>
         </div>
        </li>
    )
}

