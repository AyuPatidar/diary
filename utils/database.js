import mongoose from "mongoose";

const DBCluster = process.env.MONGODB_URI;
const DBLocal = process.env.MONGODB_URI;

let DB_URL = DBCluster;

if (process.argv[2] && process.argv[2] === "dblocal") DB_URL = DBLocal;

module.exports = () => {
  console.log("connecting to DB...");
  mongoose
    .connect(DB_URL, {
      dbName: "diary",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
