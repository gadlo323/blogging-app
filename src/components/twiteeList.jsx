import { useContext } from "react";
import { ListTweets } from "../conteaxts/listTweets.js";
import { TwitteItem } from "./twiteeItem.jsx";
import moment from "moment";
import "./TwiteeList.css";
function TwiteeList() {
  const { twittes } = useContext(ListTweets);
  return (
    <div className="all-twitees">
      <ul className="list-twitees">
        {twittes.map((item) => (
          <TwitteItem
            key={item.id}
            user={item.username}
            text={item.content}
            createdAt={moment(item.date).format("hh:mm:ss DD.MM.YYYY")}
          />
        ))}
      </ul>
    </div>
  );
}

export default TwiteeList;
