import mongoose from "mongoose";

export default async () => {
  return mongoose.connect(process.env.MONGO_URL, {

  });
}   // This is the connection.js file in the server/database folder. It is used to connect to the MongoDB database using Mongoose. It exports a function that connects to the database using the MONGO_URL environment variable. The function returns a promise that resolves to the database connection. This file is imported and used in the server/index.js file to establish the database connection when the server starts.