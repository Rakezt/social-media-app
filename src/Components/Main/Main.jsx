import { Avatar, Button } from "@material-tailwind/react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import live from "../Assets/images/live.png";
import smile from "../Assets/images/smile.png";
import addImage from "../Assets/images/add-image.png";
import { useAppContext } from "../Context/AppContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { postActions, postReducer, postStates } from "../Context/PostReducer";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Main = () => {
  const { user, userData } = useAppContext();
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(postReducer, postStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp,
        });
        text.current.value = "";
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.messages);
        console.log(error.messages);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };
  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    console.log("File", file);
    if (!file) return;
    if (file) {
      try {
        const storageRef = ref(storage, `image/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc.docs.map((item) => item.data()),
        });
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            src="https://cdn.pixabay.com/photo/2020/11/27/06/58/cat-5781057_1280.jpg"
            size="sm"
            variant="circular"
            alt="abc"
          ></Avatar>
          <form className="w-full" onClick={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  className="outline-none w-full bg-white rounded-md"
                  placeholder={`What's on your mind ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0)?.toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                  ref={text}
                />
              </div>
              <div className="mx-4">
                {image && (
                  <img
                    className="h-24 rounded-xl"
                    src={image}
                    alt="previewImage"
                  />
                )}
              </div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        ></span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              <img className="h-10 mr-4" src={addImage} alt="addImage" />
              <input
                type="file"
                id="addImage"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </label>
            {file && (
              <Button variant="text" onClick={submitImage}>
                Upload
              </Button>
            )}
          </div>{" "}
          <div className="flex items-center">
            <img className="h-10 mr-4" src={live} alt="live" />
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Live
            </p>
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={smile} alt="feeling" />
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Feeling
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">Post</div>
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Main;
