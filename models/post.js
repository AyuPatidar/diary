import { Schema, models, model } from "mongoose";

const postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: [true, "Date can not be empty"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
});

const Post = models.Post || model("Post", postSchema);

export default Post;
