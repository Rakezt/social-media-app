import React, { useState } from "react";

const RightSide = () => {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img
          className="h-48 rounded-md"
          src="https://media.istockphoto.com/id/1467878602/photo/humanoid-robots-revolutionizing-mundane-tasks.jpg?s=1024x1024&w=is&k=20&c=1HLIn9PArwxV4Jba-rKclHCE3BO9D-4xct-T8kzLgmg="
          alt="nature"
        />
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
      </div>
    </div>
  );
};

export default RightSide;
