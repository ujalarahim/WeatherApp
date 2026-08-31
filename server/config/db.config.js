import mongoose from "mongoose";

async function ConnectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URL);
        console.log(`server is successfully connected on ${connectionInstance.connection.host} and port ${connectionInstance.connection.port}`)
    } catch (error) {
        console.log(`failed to connect to db ${error}`);
        process.exit(1);
    }
}


export default ConnectDB;