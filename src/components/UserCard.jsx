"use client";

import { useSession } from "next-auth/react";

const UserCard = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <h2 className="font-bold">User - Client</h2>
      <div className="border p-4">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
