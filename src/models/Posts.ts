import mongoose, { Document, mongo } from "mongoose";

export interface IPostSchema extends Document {
  user?: mongoose.Schema.Types.ObjectId;
  type: string;
  name?: string;
  avatar?: string;
  likes?: [
    {
      user?: string;
    }
  ];
  comment?: [
    {
      user?: mongoose.Schema.Types.ObjectId;
      text: string;
      name?: string;
      avatar?: string;
    }
  ];
}

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IPostSchema>("Posts", postSchema);
