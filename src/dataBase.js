import axios from "axios";
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
