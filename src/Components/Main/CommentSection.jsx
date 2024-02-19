import { Avatar } from "@material-tailwind/react";
import React, { useEffect, useReducer, useRef } from "react";
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
import avatar from "../Assets/images/avatar.png";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { user, userData } = useAppContext();
  const comment = useRef("");
  const commentRef = collection(db, "posts", postId, "comments");
  const [state, dispatch] = useReducer(postReducer, postStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const addComment = async (e) => {
    e.preventDefault();
    if (comment.current.value !== "") {
      try {
        const newCommentRef = doc(commentRef);
        await setDoc(newCommentRef, {
          id: newCommentRef.id,
          image: user?.photoURL,
          comment: comment.current.value,
          name:
            userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1) || user?.displayName?.split(" ")[0],
          timeStamp: serverTimestamp(),
        });
        comment.current.value = "";
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const q = query(commentRef, orderBy("timeStamp", "desc"));
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_COMMENT,
            comments: doc?.docs?.map((item) => item.data()),
          });
        });
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        console.error(error);
      }
    };
    return () => getComments();
  }, [postId, ADD_COMMENT, HANDLE_ERROR]);

  return (
    <div className="flex flex-col  bg-white w-full py-2 rounded-b-3xl">
      <div className="flex items-center">
        <div className="mx-2">
          <Avatar
            size="sm"
            variant="circular"
            src={user?.photoURL || avatar}
          ></Avatar>
        </div>
        <div className="w-full pr-2">
          <form className="flex items-center w-full" onSubmit={addComment}>
            <input
              name="comment"
              type="text"
              color="blue-gray"
              placeholder="Write a comment..."
              className="w-full rounded-2xl outline-none border border-gray-800 p-2 bg-gray-100"
              ref={comment}
            ></input>
            <button className="hidden" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      {state.comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            image={comment?.image}
            name={comment?.name}
            comment={comment?.comment}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
