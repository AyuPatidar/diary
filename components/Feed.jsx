"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MemoryCard from "./MemoryCard";

const MemoryList = ({ data, handlePostClick }) => {
  return (
    <div className="mt-6 post_layout">
      {data.map((post) => (
        <MemoryCard
          key={post._id}
          memory={post}
          handlePostClick={handlePostClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [session?.user.id]);
  const handlePostClick = (post) => {
    return router.push(`/post/${post._id}`);
  };
  return (
    <section className="feed">
      <MemoryList
        data={posts}
        handlePostClick={handlePostClick}
      />
    </section>
  );
};

export default Feed;
