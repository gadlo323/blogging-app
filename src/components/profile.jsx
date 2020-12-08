import React, { useState } from "react";
import "./profile.css";
import Signednav from "./SignedNav";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useAuth } from "../conteaxts/AutoConeaxt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../firebase";

const override = css`
  position: fixed;
  top: 30%;
  left: 46%;
  border-color: red;
`;
const Profile = () => {
  const { currentUser, updateProfilename, updateProfilephoto } = useAuth();
  const [userName, setUsername] = useState("");
  const [urlImg, setUrlimg] = useState("");
  const [urlUpload, seturlUpload] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState();
  const types = ["image/png", "image/jpeg"];

  const onSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    if (userName.length > 2) {
      setDisabled(false);
      setTimeout(() => {
        updateProfilename(userName);
        updateDb();
        notify("user name changed");
        setLoader(false);
      }, 2000);
    }

    if (urlImg) {
      setDisabled(true);
      const storgeRef = firebase.storage().ref("/userImages");
      const upload = storgeRef.child(currentUser.uid);
      upload.put(urlUpload).then((url) => {
        notify("Image uploaded");
      });
      setTimeout(() => {
        upload.getDownloadURL().then(function (url) {
          updateProfilephoto(url);
          setUrlimg(url);
          setLoader(false);
        });
      }, 2000);
    }
  };

  const onChange = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setError("");
      setDisabled(false);
      let reader = new FileReader();
      reader.onload = (e) => {
        setUrlimg(e.target.result);
        seturlUpload(file);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUrlimg("");
      setDisabled(true);
      notifyError();
      setError("Please select an image file (png, jpeg)!");
    }
  };

  const updateDb = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .set({ username: userName })
      .catch((error) => console.error("Error: ", error));
  };
  const notify = (type) => toast.success(` ${type} successfully  !`);
  const notifyError = () =>
    toast.error("Please select an image file (png, jpeg)!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <Signednav />
      <section className="profile">
        <ToastContainer className="notification" />
        <div className="wreppar">
          <div className="top-profile">
            <h2>Profile</h2>
            <img
              className="profile-img"
              src={
                currentUser.photoURL ? currentUser.photoURL : "./programmer.png"
              }
              alt="profile-img"
            />
          </div>

          <form className="profile-form" onSubmit={(event) => onSubmit(event)}>
            <div className="top-form-profile">
              <label htmlFor="profile">User Name</label>
              <input
                id="profile"
                className="profile-field"
                placeholder={currentUser.displayName}
                minLength="2"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="img">Select image:</label>
              <input
                onChange={(e) => onChange(e)}
                type="file"
                id="img"
                className="btn-picimg"
                name="img"
                accept="image/*"
              ></input>
            </div>
            <div className="bottom-form-profile">
              <button
                disabled={disabled}
                type="submit"
                className="submit-profile"
              >
                Save
              </button>
            </div>
            <span className="error-upload">{error}</span>
            <img
              className="profile-upload"
              src={urlImg ? urlImg : "./programmer.png"}
              alt="profile-img"
            />
          </form>
        </div>
      </section>
      <HashLoader
        css={override}
        size={100}
        color={"#123abc"}
        loading={loader}
      />
    </>
  );
};

export default Profile;
