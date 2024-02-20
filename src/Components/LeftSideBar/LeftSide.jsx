import { Avatar, Tooltip } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import location from "../Assets/images/location.png";
import avatar from "../Assets/images/avatar.png";
import job from "../Assets/images/job.png";
import wall from "../Assets/images/wall.jpg";
import laptop from "../Assets/images/laptop.jpg";
import media from "../Assets/images/media.jpg";
import apps from "../Assets/images/apps.jpg";
import tik from "../Assets/images/tik.jpg";
import { useAppContext } from "../Context/AppContext";

const LeftSide = () => {
  const [data, setData] = useState([]);
  const count = useRef(0);
  const { user, userData } = useAppContext();

  const handleRandom = (arr) => {
    setData(arr[Math.floor(Math.random() * arr?.length)]);
  };
  useEffect(() => {
    const imageList = [
      { id: "1", image: laptop },
      { id: "2", image: media },
      { id: "3", image: apps },
      { id: "4", image: tik },
    ];
    handleRandom(imageList);
    let countAds = 0;
    let startAds = setInterval(() => {
      countAds++;
      handleRandom(imageList);
      count.current = countAds;
      if (countAds === 5) {
        clearInterval(startAds);
      }
    }, 2000);
    return () => clearInterval(startAds);
  }, []);

  const progressBar = () => {
    switch (count.current) {
      case 1:
        return 15;
      case 2:
        return 30;
      case 3:
        return 45;
      case 4:
        return 60;
      case 5:
        return 75;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img className="h-35 w-full rounded-r-xl" src={wall} alt="alt" />
        <div className="absolute -bottom-4">
          <Tooltip content="Profile" placement="top">
            <Avatar src={user?.photoURL || avatar} size="md" alt="abc"></Avatar>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-6">
        <p className="font-roboto font-medium text-md text-gray-700 no -underline tracking-normal leading-none">
          {user?.email || userData?.email}
        </p>
        <p className="font-roboto font-medium text-sx text-gray-700 no -underline tracking-normal leading-none">
          Access inclusive tools and insight
        </p>
        <p className="font-roboto font-medium text-sm text-gray-700 no -underline tracking-normal leading-none py-2">
          Try premium for free
        </p>
      </div>
      <div className="flex flex-col pl-2">
        <div className="flex items-center pb-4">
          <img className="h-10" src={location} alt="location" />
          <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
            Bangalore
          </p>
        </div>
        <div className="flex items-center">
          <img className="h-10" src={job} alt="job" />
          <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
            React Developer
          </p>
        </div>
        <div className="flex justify-center items-center p-8">
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Events
          </p>
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            Groups
          </p>
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
            Follow
          </p>
          <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
            More
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center pt-4">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
          {" "}
          Random Ads
        </p>
        <div
          style={{ width: `${progressBar()}%` }}
          className="bg-blue-600 rounded-xl h-1 mb-4"
        ></div>
        <img className="h-36 rounded-lg" src={data.image} alt="ads" />
      </div>
    </div>
  );
};

export default LeftSide;
