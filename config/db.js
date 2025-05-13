
import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null}
}

async function connectDB() {

    if (cached.conn ) {
        return cached.conn
    }

    if (!cached.promise ) {
        const opts = {
            bufferCommands:false
        }

        const mongoUri = "mongodb+srv://ecotrade:Aathifahd2002@cluster0.rbdxrrl.mongodb.net"

        cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn

}

export default connectDB
