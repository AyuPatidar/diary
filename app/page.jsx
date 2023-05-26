"use client";

import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <h1 className="m-1 welcome_head_text">
            Welcome to the <s>Diary</s> Secret Space
          </h1>
          <p className="m-1 welcome_text">
            Collect your day in a portable imaginary space
          </p>
        </div>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="m-1 black_btn"
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `/profile/${session?.user.id}`,
                })
              }
            >
              Sign In with {provider.name}
            </button>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
