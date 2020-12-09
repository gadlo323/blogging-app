import React, { useEffect, useState } from "react";
import { ListTweets } from "../conteaxts/listTweets";
import firebase from "../firebase";
import { NewTweet } from "../conteaxts/newTweet.js";
import Signednav from "./SignedNav";
import "./deshborad.css";
import TwiterForm from "./twiterForm.jsx";
import TwiteeList from "./twiteeList";
import { useAuth } from "../conteaxts/AutoConeaxt";
const Deshborad = () => {
  const [twittes, setTwittes] = useState([]);
  const [lastTweet, setLastweet] = useState({});
  const [errorLoadmore, SeterrorLoadmore] = useState(false);
  const { currentUser } = useAuth();

  // on firebase changed
  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection("blogging")
      .orderBy("date", "desc")
      .limit(10)
      .onSnapshot(async (snapshot) => {
        if (snapshot.docs.length > 0) {
          setLastweet(snapshot.docs[snapshot.docs.length - 1].data());
          //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
          const lists = await Promise.all(
            snapshot.docs.map(async (doc) => ({
              id: doc.id,
              username: await userInfo(doc.data().userId),
              ...doc.data(),
            }))
          );
          setTwittes(lists);
        }
      });

    return () => {
      getData();
    };
  }, []);

  const userInfo = async (id) => {
    const name = await firebase.firestore().collection("users").doc(id).get();
    return name.data().username;
  };

  const handleNewtwitee = (twitee) => {
    firebase
      .firestore()
      .collection("blogging")
      .doc(twitee.id)
      .set(twitee)
      .catch((err) => {
        console.log(err);
      });
  };

  const Loadmore = () => {
    if (twittes.length > 0) {
      firebase
        .firestore()
        .collection("blogging")
        .orderBy("date", "desc")
        .startAfter(lastTweet.date)
        .limit(10)
        .get()
        .then(async (query) => {
          if (query.docs.length > 0) {
            SeterrorLoadmore(false);
            const lastdoc = query.docs[query.docs.length - 1].data();
            const lists = await Promise.all(
              query.docs.map(async (doc) => ({
                id: doc.id,
                username: await userInfo(doc.data().userId),
                ...doc.data(),
              }))
            );
            setTwittes((prevTweets) => [...prevTweets, ...lists]);
            setLastweet(lastdoc);
          } else {
            SeterrorLoadmore(true);
          }
        });
    }
  };

  return (
    <>
      <Signednav />
      <section className="dashborad">
        <h1 className="wolcm-user">Hello {currentUser.displayName}</h1>
        <NewTweet.Provider
          value={{ setNewTweet: (tweet) => handleNewtwitee(tweet) }}
        >
          <TwiterForm />
        </NewTweet.Provider>
        <ListTweets.Provider
          value={{
            twittes,
          }}
        >
          <TwiteeList />
        </ListTweets.Provider>
        {twittes.length === 0 && (
          <h1 className="empty-twwets">
            Oops it looks like there are no more tweets...&#129335;
          </h1>
        )}
        <div className="load-more" title="Load more tweets">
          {errorLoadmore && (
            <span className="error-more"> No more tweets... </span>
          )}
          <button type="button" className="load-more-btn" onClick={Loadmore}>
            <i
              className={
                errorLoadmore || twittes.length === 0
                  ? "arrow-not-show"
                  : "fa fa-arrow-down"
              }
            ></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default Deshborad;
