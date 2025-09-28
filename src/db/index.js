import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );

    console.log(
      "mongodb connected successfully running on port DB Host =>",
      connectionInstance.connection.host
    );
  } catch (error) {
    throw new Error(error, "mongodb connection failed!");
  }
};

export default connectDB;
