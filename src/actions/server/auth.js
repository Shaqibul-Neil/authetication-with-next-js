"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  console.log(payload);
  //0 - validation if the payload has email, password or not

  //1. check if user exist or not
  const isExist = await dbConnect("users").findOne({ email: payload.email });
  if (isExist) return { success: false, message: "User already exist" };
  //2. if not create new user
  const hashPassword = await bcrypt.hash(payload.password, 10);
  console.log(hashPassword);
  const newUser = {
    ...payload,
    createdAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };
  console.log(newUser);
  //3. save user info to database
  const result = await dbConnect("users").insertOne(newUser);
  if (result.acknowledged) {
    //console.log(result);   insertedId: new ObjectId('69600a4f21eed0fd9f188f08')
    return {
      success: true,
      message: `User created with ${result.insertedId.toString()})`, //এটা BSON টাইপের একটা object
    };
  } else {
    return { success: false, message: "Something went wrong" };
  }
};
