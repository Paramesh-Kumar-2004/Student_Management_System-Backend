const mongoose = require("mongoose")



async function ConnectDB() {
    mongoose.connect("mongodb://127.0.0.1:27017/NarutoTodo")
        .then(() => console.log("✅ MongoDB Connected"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

module.exports = ConnectDB;


