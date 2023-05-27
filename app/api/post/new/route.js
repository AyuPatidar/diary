import Post from "@/models/post";
import dbConnect from "@/utils/database";

export const POST = async (req) => {
  const { date, content, userId } = await req.json();
  try {
    await dbConnect();
    const newPost = new Post({
      creator: userId,
      date,
      content,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create memory", { status: 500 });
  }
};
