import axios from "axios";
import localforage from "localforage";
const url =
  "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";
export const getTweet = async () => {
  try {
    const response = await axios.get(`${url}`);
    const data = await response.data;
    return data.tweets;
  } catch (err) {
    console.log(err);
  }
};

export const submitTweet = async (newTweet) => {
  try {
    return axios.post(url, newTweet);
  } catch (err) {
    alert(err);
  }
};

export const saveUser = (item) => {
  localforage.setItem("0", item).catch(function (err) {
    console.log(err);
  });
};

export const getUser = async () => {
  let data = await localforage
    .getItem("0", function (err, value) {
      return value;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
