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
  const createMemory = async (event) => {
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
      if (response.ok) return router.push(`/profile`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <Header />
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createMemory}
      />
    </>
  );
};

export default CreateMemory;
