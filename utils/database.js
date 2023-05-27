import mongoose from "mongoose";

// let isConnected = false;

// export const connectToDB = async () => {
//   mongoose.set("strictQuery", true);
//   if (isConnected) return;
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "diary",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//   } catch (error) {
//     console.log(error);
//   }
// };

const DBCluster = process.env.MONGODB_URI;
const DBLocal = process.env.MONGODB_URI;

let DB_URL = DBCluster;

if (process.argv[2] && process.argv[2] === "dblocal") DB_URL = DBLocal;

// console.log(`DB_URL`, DB_URL);

module.exports = () => {
  console.log("connecting to DB...");
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
