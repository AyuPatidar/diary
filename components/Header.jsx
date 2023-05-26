"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  }, []);
  return (
    width > 639 && (
      <header className="w-full flex flex-row mt-4 mb-0 mx-6 p-2 justify-center">
        <Image
          src={session?.user.image}
          width={100}
          height={100}
          className="rounded-full mr-2"
          alt="user-image"
        />
        <div className="flex flex-col ml-2 justify-evenly items-center">
          <h1 className="name_text">{session?.user.name}</h1>
          <h4 className="email_text">{session?.user.email}</h4>
        </div>
      </header>
    )
  );
};

export default Header;
