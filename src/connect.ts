import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Sucessfully connected to to mongoDB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
