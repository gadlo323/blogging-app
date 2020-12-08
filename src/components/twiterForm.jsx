import React, { useContext, useState } from "react";
import { NewTweet } from "../conteaxts/newTweet.js";
import "./twiterForm.css";
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../conteaxts/AutoConeaxt";
const override = css`
  position: fixed;
  top: 30%;
  left: 46%;
  border-color: red;
`;
const TwiterForm = () => {
  const { currentUser } = useAuth();
  const { setNewTweet } = useContext(NewTweet);
  const [content, setContent] = useState("");
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    if (e.target.value.length <= 140) {
      setContent(e.target.value);
      setDisabled(false);
      setActive(false);
    } else {
      setDisabled(true);
      setActive(true);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);
    const twitee = {
      id: uuidv4(),
      userId: currentUser.uid,
      content: content,
      date: new Date().toISOString(),
    };
    setNewTweet(twitee);
    setTimeout(() => {
      setContent("");
      setLoading(false);
      setDisabled(false);
    }, 2000);
  };

  return (
    <div className="twitte">
      <div className="wreppar-top">
        <form className="twitte-form" onSubmit={(event) => onSubmit(event)}>
          <div className="top-form">
            <textarea
              className="twitee-field"
              rows="5"
              cols="10"
              placeholder="What you have in mind..."
              value={content}
              onChange={(e) => onChange(e)}
              required
            ></textarea>
          </div>
          <div className="bottom-form">
            <div className={active ? "eroor-field" : "remove"}>
              <p className="error-form">
                The tweet can't contain more then 140 chars.
              </p>
            </div>
            <button type="submit" className="submit-twitee" disabled={disabled}>
              Tweet
            </button>
          </div>
        </form>
      </div>
      <HashLoader
        css={override}
        size={100}
        color={"#123abc"}
        loading={loading}
      />
    </div>
  );
};

export default TwiterForm;
