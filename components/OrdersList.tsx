"use client";

import { Order, Product } from "@/sanity.types";
import React from "react";
import { motion } from "framer-motion";
import OrdersComponent from "./OrdersComponent";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the proper type based on the MY_ORDERS_QUERY structure
type OrderWithProducts = Order & {
    products?: Array<{
        _key: string;
        quantity?: number;
        product?: Product;
    }>;
};

interface OrdersListProps {
    orders: OrderWithProducts[] | null;
}

const OrdersList = ({ orders }: OrdersListProps) => {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-3">
                        My Orders
                    </h1>
                    <p className="text-gray-500 text-lg">
                        {orders && orders.length > 0
                            ? `You have ${orders.length} order${orders.length > 1 ? 's' : ''} listed`
                            : "Check the status of your recent orders"}
                    </p>
                </div>
                <Link href="/">
                    <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 transition-all">
                        Go to Home
                    </Button>
                </Link>
            </motion.div>

            {/* Table Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 overflow-hidden border border-gray-100"
            >
                <ScrollArea>
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                <TableHead className="w-[100px] md:w-auto py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Order Number
                                </TableHead>
                                <TableHead className="hidden md:table-cell py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Date
                                </TableHead>
                                <TableHead className="py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Customer
                                </TableHead>
                                <TableHead className="hidden sm:table-cell py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Email
                                </TableHead>
                                <TableHead className="py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Total
                                </TableHead>
                                <TableHead className="py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Status
                                </TableHead>


                            </TableRow>
                        </TableHeader>
                        <OrdersComponent orders={orders || []} />
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </motion.div>
        </div>
    );
};

export default OrdersList;