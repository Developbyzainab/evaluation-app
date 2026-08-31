const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/skilleval";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    
    try {
      const usersDeleted = await mongoose.connection.db.collection("users").deleteMany({});
      console.log("Cleared users collection:", usersDeleted);
    } catch (e) {
      console.log("No users collection or failed to clear:", e.message);
    }
    
    try {
      const resultsDeleted = await mongoose.connection.db.collection("testresults").deleteMany({});
      console.log("Cleared testresults collection:", resultsDeleted);
    } catch (e) {
      console.log("No testresults collection or failed to clear:", e.message);
    }
    
    try {
      const certificatesDeleted = await mongoose.connection.db.collection("certificates").deleteMany({});
      console.log("Cleared certificates collection:", certificatesDeleted);
    } catch (e) {
      console.log("No certificates collection or failed to clear:", e.message);
    }
    
    console.log("Database cleared successfully!");
  } catch (err) {
    console.error("Error clearing database:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
