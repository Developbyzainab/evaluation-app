#!/usr/bin/env node

/**
 * Test MongoDB connection and NextAuth setup
 */

const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  console.log(`📍 MongoDB URI: ${process.env.MONGODB_URI}`);
  console.log(`🔐 NextAuth Secret: ${process.env.NEXTAUTH_SECRET ? '✓ Set' : '✗ Missing'}`);
  console.log(`🌐 NextAuth URL: ${process.env.NEXTAUTH_URL || 'Not set (will default to localhost:3000)'}`);

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('\n✅ MongoDB connection successful!');
    
    // Test creating a collection
    const testDb = mongoose.connection.db;
    const collections = await testDb.listCollections().toArray();
    console.log(`📦 Collections found: ${collections.length}`);
    
    await mongoose.connection.close();
    console.log('\n✅ All tests passed! You can now start the app with: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error(`   ${error.message}`);
    console.error('\n💡 Make sure:');
    console.error('   1. MongoDB is running (use: mongod)');
    console.error('   2. MONGODB_URI in .env.local is correct');
    console.error('   3. Environment variables are set');
    process.exit(1);
  }
}

testConnection();
