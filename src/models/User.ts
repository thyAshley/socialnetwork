import mongoose from "mongoose";

interface IuserSchema extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  avatar: {
    type: String,
    default:
      "https://png.pngitem.com/pimgs/s/508-5087236_tab-profile-f-user-icon-white-fill-hd.png",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IuserSchema>("User", userSchema);
