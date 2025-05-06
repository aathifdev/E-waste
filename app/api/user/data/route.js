import connectDB from "@/config/db";
import User from '@/models/User';
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();

    let user = await User.findById(userId);

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      user = await User.create({
        _id: userId,
        name: clerkUser.firstName || 'No Name',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        imageUrl: clerkUser.imageUrl,
      });
    }

    return NextResponse.json({ success: true, user });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
