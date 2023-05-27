import Post from "@/models/post";
import dbConnect from "@/utils/database.js";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const posts = await Post.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts of user", { status: 500 });
  }
};
