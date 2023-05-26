import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const MemoryCard = ({ memory, handlePostClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div
      className={
        pathname === `/profile/${session?.user.id}`
          ? "feed_post_card"
          : "post_card"
      }
      onClick={() => handlePostClick && handlePostClick(memory)}
    >
      <p className="my-4 font-montserrat text-lg text-gray-700">
        {memory.date.slice(0, 10)}
      </p>
      {pathname === `/profile/${session?.user.id}` ? (
        <p className="font-montserrat text-base cursor-pointer">
          {memory.content.slice(0, 100)}...
        </p>
      ) : (
        <>
          <p className="font-montserrat text-base">{memory.content}</p>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MemoryCard;
