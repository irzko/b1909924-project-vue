const { server } = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/popbox");
    console.log("Connected to the database!");

    const PORT = config.app.port;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}
startServer();
