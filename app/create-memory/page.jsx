"use client";

import Form from "@/components/Form";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateMemory = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dateToday = new Date();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    date: dateToday,
    content: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/post/new`, {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          date: post.date,
          content: post.content,
        }),
      });
      if (response.ok) return router.push(`/profile/${session?.user.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!session?.user) return router.push("/");

  return (
    <>
      <Nav />
      <Header />
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateMemory;
