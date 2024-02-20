import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import avatar from "../Assets/images/avatar.png";
import ads from "../Assets/images/ads.png";

import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const RightSide = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useAppContext();
  const friendList = userData?.friends || [];

  const searchFriends = (group) => {
    return group.filter((friend) =>
      friend["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-48 rounded-md" src={ads} alt="nature" />
      </div>
      <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-inderline tracking-normal leading-tight py-2 mx-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
        necessitatibus eum saepe recusandae qui, nesciunt iure culpa quas beatae
        officia, maxime ad, accusantium tempore dicta aliquid. Nam quae ullam
        vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
        perferendis qui unde quidem veritatis! Tempore enim modi asperiores
        libero iure architecto recusandae, nisi natus possimus incidunt neque
        dolorem, soluta repellat.
      </p>
      <div className="mx-2 mt-10">
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Friends :{" "}
        </p>
        <input
          className="border-0 outline-none mt-4"
          name="input"
          value={input}
          type="text"
          placeholder="Search Friends"
          onChange={(e) => setInput(e.target.value)}
        />
        {friendList?.length > 0 ? (
          searchFriends(friendList)?.map((friend) => {
            return (
              <div
                className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
                key={friend.id}
              >
                <Link to={`/profile/${friend.id}`}>
                  <div className="flex items-center my-2 cursor-pointer">
                    <div className="flex items-center">
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="avatar"
                        src={friend?.image || avatar}
                      ></Avatar>
                      <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() =>
                      removeFriend(friend.id, friend.name, friend.image)
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            );
          })
        ) : (
          <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add friend to check their profile
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSide;
