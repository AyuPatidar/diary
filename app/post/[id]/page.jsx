"use client";

import Header from "@/components/Header";
import MemoryCard from "@/components/MemoryCard";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Memory = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const postId = params.id;
  const [post, setPost] = useState({ date: "", content: "" });
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, [postId]);
  const handleEdit = async (event) => {
    router.push(`/update-memory?id=${post._id}`);
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await fetch(`/api/post/${params.id}`, { method: "DELETE" });
      return router.push(`profile/${session?.user.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <Header />
      <MemoryCard
        memory={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Memory;
