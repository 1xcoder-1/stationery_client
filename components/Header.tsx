import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/queries";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  return <HeaderClient orders={orders} />;
};

export default Header;