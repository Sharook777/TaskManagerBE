import mongoose from "mongoose";

const initiateMongoDb = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("-------------------->>>> Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default initiateMongoDb;
