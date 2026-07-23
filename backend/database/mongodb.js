import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
  const uri = process.env.MONGO_URI
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

export default connectDb