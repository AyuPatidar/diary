"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import Header from "@/components/Header";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState({ date: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost({
        date: data.date,
        content: data.content,
      });
    };
    if (postId) fetchPost();
  }, [postId]);
  const updateMemory = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    if (!postId) return alert("Missing Memory");
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          date: post.date,
          content: post.content,
        }),
      });
      if (response.status === 200) return router.push("/");
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateMemory}
      />
    </>
  );
};

export default page;
