"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Feed from "@/components/Feed";

const Profile = () => {
  return (
    <>
      <Nav />
      <Header />
      <Feed />
    </>
  );
};

export default Profile;
