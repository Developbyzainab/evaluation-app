import connectDB from "../src/lib/mongodb.js";
import User from "../src/models/User.js";
import TestResult from "../src/models/TestResult.js";
import Certificate from "../src/models/Certificate.js";

async function clearDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Cleared all users");

    await TestResult.deleteMany({});
    console.log("Cleared all test results");

    await Certificate.deleteMany({});
    console.log("Cleared all certificates");

    console.log("Database cleared successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing database:", error);
    process.exit(1);
  }
}

clearDatabase();