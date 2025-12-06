import Container from "@/components/Container";
import { getMyOrders } from "@/sanity/queries";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import EmptyOrdersState from "@/components/EmptyOrdersState";
import OrdersList from "@/components/OrdersList";

const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  if (!orders?.length) {
    return <EmptyOrdersState />;
  }

  return (
    <div>
      <Container className="py-10">
        <OrdersList orders={orders} />
      </Container>
    </div>
  );
};

export default OrdersPage;
