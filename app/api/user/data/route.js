import connectDB from "@/config/db";
import User from '@/models/User';
import { auth, } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {

    try {
        const {userId} = auth(request)

        await connectDB()
        const user = await User.findOne({ clerkId: userId})

        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found"})
        }

        return NextResponse.json({success:true, user})

    } catch (error) {
        console.error('Api Error:', error);
        return NextResponse.json({ success: false, message: error.message})
    }
    
}