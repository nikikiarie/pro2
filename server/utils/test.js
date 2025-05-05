require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function debugDatabase() {
  try {
    // 1. Connect with verbose settings
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ Connected to:", conn.connection.host);

    // 2. Create test document WITHOUT any model
    const testDoc = {
      _id: new mongoose.Types.ObjectId(),
      title: "DIRECT_INSERT_TEST_" + Date.now(),
      price: 9.99,
      debug: true,
      createdAt: new Date()
    };

    const result = await conn.connection.db.collection('products').insertOne(testDoc);
    console.log("🛠️  Raw insert result:", {
      insertedId: result.insertedId,
      acknowledged: result.acknowledged
    });

    // 3. Verify the document exists
    const foundDoc = await conn.connection.db.collection('products').findOne({
      _id: testDoc._id
    });
    console.log("🔍 Verification:", foundDoc ? "DOCUMENT FOUND" : "NOT FOUND");

  } catch (err) {
    console.error("❌ FAILED:", err.message);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
}

debugDatabase();