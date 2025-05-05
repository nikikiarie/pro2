const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const bcrypt = require('bcrypt');
require('dotenv').config();

// User Model
const User = mongoose.model('User', new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false }
}, { timestamps: true }));

// 10 Sample Users (with realistic data)
const sampleUsers = [
    {
        firstname: "Admin",
        lastname: "User",
        username: "admin1",
        password: "Admin@1234",
        img: "https://i.pravatar.cc/150?img=1",
        email: "admin1@example.com",
        isAdmin: true,
        verified: true
    },
    {
        firstname: "John",
        lastname: "Doe",
        username: "johndoe",
        password: "JohnDoe@123",
        img: "https://i.pravatar.cc/150?img=2",
        email: "john.doe@example.com",
        verified: true
    },
    {
        firstname: "Jane",
        lastname: "Smith",
        username: "janesmith",
        password: "JaneSmith@123",
        img: "https://i.pravatar.cc/150?img=3",
        email: "jane.smith@example.com",
        verified: true
    },
    {
        firstname: "Robert",
        lastname: "Johnson",
        username: "robj",
        password: "RobJ@2023",
        img: "https://i.pravatar.cc/150?img=4",
        email: "robert.j@example.com"
    },
    {
        firstname: "Emily",
        lastname: "Williams",
        username: "emilyw",
        password: "EmilyW@2023",
        img: "https://i.pravatar.cc/150?img=5",
        email: "emily.w@example.com",
        verified: true
    },
    {
        firstname: "Michael",
        lastname: "Brown",
        username: "mikeb",
        password: "MikeBrown@123",
        img: "https://i.pravatar.cc/150?img=6",
        email: "michael.b@example.com"
    },
    {
        firstname: "Sarah",
        lastname: "Davis",
        username: "sarahd",
        password: "SarahD@2023",
        img: "https://i.pravatar.cc/150?img=7",
        email: "sarah.d@example.com",
        verified: true
    },
    {
        firstname: "David",
        lastname: "Miller",
        username: "davidm",
        password: "DavidM@123",
        img: "https://i.pravatar.cc/150?img=8",
        email: "david.m@example.com"
    },
    {
        firstname: "Lisa",
        lastname: "Wilson",
        username: "lisaw",
        password: "LisaW@2023",
        img: "https://i.pravatar.cc/150?img=9",
        email: "lisa.w@example.com",
        isAdmin: true,
        verified: true
    },
    {
        firstname: "James",
        lastname: "Taylor",
        username: "jamest",
        password: "JamesT@123",
        img: "https://i.pravatar.cc/150?img=10",
        email: "james.t@example.com"
    }
];

async function populateDB() {
    try {
        await mongoose.connect('mongodb+srv://nick:Eo2WSUYs9NsD7txp@cluster0.sgpnxjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connected to MongoDB Atlas');

        await User.deleteMany({});
        console.log('🗑️ Cleared existing users');

        const hashedUsers = await Promise.all(
            sampleUsers.map(async user => ({
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }))
        );

        const result = await User.insertMany(hashedUsers);
        console.log(`📊 Successfully inserted ${result.length} users`);
        
        // Display inserted users (without passwords)
        console.log('\nInserted users:');
        result.forEach(user => {
            console.log(`- ${user.firstname} ${user.lastname} (${user.email})`);
        });

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        if (err.code === 11000) {
            console.log('Duplicate key error - check username/email uniqueness');
        }
        process.exit(1);
    }
}

populateDB();