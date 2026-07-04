"use client";

import { useGetUserProfileQuery } from '@/redux/services/authApi'; // Switched to auto-fetching query hook
import { User, ShoppingBag, MapPin, LogOut, Settings, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UserProfile = () => {
    // Implicitly fetches the logged-in user without needing an ID param.
    // If your API requires no parameters, pass undefined or skip tokens depending on configuration.
    const { data: response, isLoading, error } = useGetUserProfileQuery()
    console.log("UserProfile data", response)
    // Premium dummy data to show fallback state before full backend integration
    const user = response?.data
        || {
        full_name: "Aria Montgomery",
        email: "aria@example.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
        created_at: "2026-03-08T12:28:14.083126Z",
        phone: "+1 (555) 234-5678"
    };

    const orders = [
        { id: "ORD-9823", date: "May 14, 2026", total: "₹4,498", items: "Floral Wrap Dress, Ribbed Knit Sweater", status: "Delivered" },
        { id: "ORD-8711", date: "April 02, 2026", total: "₹1,299", items: "Roadster Checked Casual Shirt", status: "Delivered" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-[60vh] bg-stone-50 flex items-center justify-center">
                <p className="text-stone-500 font-serif text-lg animate-pulse">Loading your Profile Info...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] bg-stone-50 flex flex-col items-center justify-center gap-4">
                <p className="text-rose-900 font-serif text-lg">Unable to load your profile details.</p>
                <Button variant="outline" className="rounded-full border-rose-900 text-rose-900" onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 font-sans font-light text-stone-800 py-12 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* PROFILE HERO HEADER */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-12 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                    <Avatar className="w-24 h-24 md:w-28 md:h-28 border-2 border-rose-100 shadow-sm">
                        <AvatarImage src={user?.avatar} alt={user.full_name} />
                        <AvatarFallback className="bg-rose-50 text-rose-900 text-xl font-serif">
                            {user?.full_name ? (
                                // If they have a name, show up to 2 initials (e.g., "John Doe" -> "JD")
                                user?.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                            ) : (
                                // If no name is available, show the default Shadcn/Lucide icon
                                <User className="w-10 h-10 md:w-12 md:h-12 text-rose-300" strokeWidth={1.5} />
                            )}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left py-2">
                        <h1 className="text-3xl md:text-4xl font-serif text-rose-900 mb-1">{user?.full_name}</h1>
                        <p className="text-stone-400 text-sm mb-4">{user?.created_at} || Not available</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 rounded-full text-xs font-medium text-rose-800">
                                <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer
                            </span>
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-rose-900 rounded-full hidden md:flex">
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>

                {/* DASHBOARD CONTENT TABS */}
                <Tabs defaultValue="account" className="w-full flex flex-col gap-8 md:flex-row items-start">

                    {/* LEFT SIDE: Navigation Menu */}
                    <TabsList className="flex flex-row md:flex-col justify-start items-stretch bg-transparent w-full md:w-64 h-auto border-b md:border-b-0 md:border-r border-stone-200 p-0 overflow-x-auto gap-2 rounded-none shrink-0 [&::-webkit-scrollbar]:hidden">
                        <TabsTrigger
                            value="account"
                            className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-medium text-sm text-stone-500 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-900 transition-all shadow-none border-b-2 border-transparent data-[state=active]:border-transparent md:data-[state=active]:bg-rose-50/70"
                        >
                            <User className="w-4 h-4" /> Account Information
                        </TabsTrigger>
                        <TabsTrigger
                            value="orders"
                            className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-medium text-sm text-stone-500 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-900 transition-all shadow-none border-b-2 border-transparent data-[state=active]:border-transparent md:data-[state=active]:bg-rose-50/70"
                        >
                            <ShoppingBag className="w-4 h-4" /> Order History
                        </TabsTrigger>
                        <TabsTrigger
                            value="addresses"
                            className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-medium text-sm text-stone-500 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-900 transition-all shadow-none border-b-2 border-transparent data-[state=active]:border-transparent md:data-[state=active]:bg-rose-50/70"
                        >
                            <MapPin className="w-4 h-4" /> Saved Addresses
                        </TabsTrigger>

                        <Separator className="my-2 hidden md:block border-stone-200" />
                        <Button variant="ghost" className="hidden md:flex items-center justify-start gap-3 px-4 py-3 text-stone-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl w-full font-medium text-sm">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </TabsList>

                    {/* RIGHT SIDE: View Panes */}
                    <div className="flex-1 w-full bg-white p-6 md:p-8 rounded-3xl border border-stone-100 shadow-sm min-h-[400px]">

                        {/* Tab 1: Account Information */}
                        <TabsContent value="account" className="m-0 flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-serif text-rose-900 mb-1">Personal Details</h2>
                                <p className="text-sm text-stone-400">Update your email, contact number, and credentials.</p>
                            </div>
                            <Separator className="border-stone-100" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-stone-400 font-medium text-xs uppercase tracking-wider">Full Name</span>
                                    <p className="text-stone-800 bg-stone-50 px-4 py-3 rounded-xl border border-stone-100 font-normal">{user?.full_name}</p>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-stone-400 font-medium text-xs uppercase tracking-wider">Email Address</span>
                                    <p className="text-stone-800 bg-stone-50 px-4 py-3 rounded-xl border border-stone-100 font-normal">{user?.email}</p>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-stone-400 font-medium text-xs uppercase tracking-wider">Phone Number</span>
                                    <p className="text-stone-800 bg-stone-50 px-4 py-3 rounded-xl border border-stone-100 font-normal">{user?.phone || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button className="bg-rose-900 hover:bg-rose-800 text-white rounded-full px-8 py-2.5 font-medium tracking-wide shadow-none">
                                    Edit Profile
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Tab 2: Order History */}
                        <TabsContent value="orders" className="m-0 flex flex-col gap-6">
                            <div>
                                <h2 className="text-xl font-serif text-rose-900 mb-1">Purchase History</h2>
                                <p className="text-sm text-stone-400">Track current purchases and view receipts.</p>
                            </div>
                            <Separator className="border-stone-100" />

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-stone-200 hover:bg-transparent">
                                            <TableHead className="font-medium text-stone-400 text-xs uppercase tracking-wider">Order ID</TableHead>
                                            <TableHead className="font-medium text-stone-400 text-xs uppercase tracking-wider">Date</TableHead>
                                            <TableHead className="font-medium text-stone-400 text-xs uppercase tracking-wider">Items Ordered</TableHead>
                                            <TableHead className="font-medium text-stone-400 text-xs uppercase tracking-wider">Total</TableHead>
                                            <TableHead className="font-medium text-stone-400 text-xs uppercase tracking-wider text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order) => (
                                            <TableRow key={order.id} className="border-stone-100 hover:bg-stone-50/30">
                                                <TableCell className="font-semibold text-stone-700">{order.id}</TableCell>
                                                <TableCell className="text-stone-500 font-normal">{order.date}</TableCell>
                                                <TableCell className="text-stone-600 max-w-xs truncate">{order.items}</TableCell>
                                                <TableCell className="font-medium text-stone-800">{order.total}</TableCell>
                                                <TableCell className="text-right">
                                                    <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full">
                                                        {order.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        {/* Tab 3: Saved Addresses */}
                        <TabsContent value="addresses" className="m-0 flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-serif text-rose-900 mb-1">Saved Addresses</h2>
                                    <p className="text-sm text-stone-400">Manage saved billing and shipping points.</p>
                                </div>
                                <Button variant="outline" className="rounded-full border-rose-900 text-rose-900 hover:bg-rose-50 shadow-none text-xs">
                                    Add New
                                </Button>
                            </div>
                            <Separator className="border-stone-100" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 border border-stone-200 rounded-2xl bg-stone-50/30 flex flex-col gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full w-fit">Primary Shipping</span>
                                    <h4 className="font-semibold text-stone-800 text-sm mt-1">Aria Montgomery</h4>
                                    <p className="text-stone-500 text-xs leading-relaxed">
                                        123 Fashion Ave, Suite 4B<br />New York, NY 10001<br />United States
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                    </div>
                </Tabs>

            </div>
        </div>
    );
};

export default UserProfile;