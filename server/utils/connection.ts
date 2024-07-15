import mongoose from "mongoose";
require("dotenv").config();

const connectionDB = async() => {
 await mongoose
    .connect(process.env.DB_URI as string)
    .then(() => {
      console.log("Database is connected Successfully");
    })
    .catch((error) => {
      console.log("err in db connection", error);
    });
};

export default connectionDB;
