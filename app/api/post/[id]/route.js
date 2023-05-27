import Post from "@/models/post";
import dbConnect from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const post = await Post.findById(params.id).populate("creator");
    if (post) return new Response(JSON.stringify(post), { status: 200 });
    else return new Response("Memory not found", { status: 404 });
  } catch (error) {
    return new Response("Unable to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { date, content } = await req.json();
  try {
    await dbConnect();
    const existingPost = await Post.findById(params.id);
    if (!existingPost) return new Response("Memory not found", { status: 404 });
    existingPost.date = date;
    existingPost.content = content;
    existingPost.save();
    return new Response("Post updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();
    await Post.findByIdAndRemove(params.id);
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Post", { status: 500 });
  }
};
