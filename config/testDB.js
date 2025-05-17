import mongoose from 'mongoose';
import connectDB from '../config/db.js'; // adjust the path if db.js is elsewhere
import User from '../models/User.js'; // adjust the path if needed

async function runDBTests() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    // Dummy data
    const dummyUser = {
      _id: `user-${Date.now()}`,
      name: "Test User",
      email: `testuser${Date.now()}@example.com`,
      imageUrl: "https://example.com/avatar.jpg",
      cartItems: {
        item1: { name: "Phone", qty: 1 },
        item2: { name: "Headphones", qty: 2 }
      }
    };

    // Insert user
    const createdUser = await User.create(dummyUser);
    console.log("✅ Inserted User:", createdUser);

  } catch (error) {
    console.error("❌ Error during DB test:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

runDBTests();
