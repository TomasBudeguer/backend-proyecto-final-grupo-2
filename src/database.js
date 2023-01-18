import mongoose from "mongoose";

const url =
  "mongodb+srv://TomasBudeguer:KJI5kQLnLz619pLl@cluster0.vjacqdu.mongodb.net/proyecto-final";

mongoose.connect(url);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("BD conectada");
});
