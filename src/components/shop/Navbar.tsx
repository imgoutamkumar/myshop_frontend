"use client";

import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-white/80 backdrop-blur-md">
            <div className="flex h-20 items-center justify-between max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* LEFT: Mobile Menu & Logo & Links */}
                <div className="flex items-center gap-6 lg:gap-10">
                    {/* Mobile Hamburger Menu (Hidden on Desktop) */}
                    <Button variant="ghost" size="icon" className="md:hidden text-stone-600">
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Brand Logo */}
                    <Link to="/shop/home" className="flex items-center gap-2">
                        {/* Replace with your actual logo image if you have one */}
                        <span className="text-3xl font-serif font-semibold text-rose-900 tracking-tight">
                            PikaPika.
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex gap-8">
                        <Link
                            to="/shop/home" // Pointing to the active nested home route
                            className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors"
                        >
                            Home
                        </Link>

                        <Link
                            to="/shop/products" // Pointing to the nested products route
                            className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors"
                        >
                            Products
                        </Link>

                        <Link
                            to="/shop/products" // Temporary fallback until you create a dedicated collections route
                            className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors"
                        >
                            Collections
                        </Link>
                    </nav>
                </div>

                {/* MIDDLE: Search Bar (Hidden on smaller screens, expands on desktop) */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8 relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-stone-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search for cozy sweaters, dresses..."
                        className="w-full pl-11 pr-4 py-6 rounded-full bg-stone-100/80 border-transparent focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 transition-all font-light text-stone-700 placeholder:text-stone-400 shadow-none"
                    />
                </div>

                {/* RIGHT: Actions (Search Icon for mobile, Wishlist, Cart, Profile) */}
                <div className="flex items-center gap-2 sm:gap-4">

                    {/* Mobile Search Icon */}
                    <Button variant="ghost" size="icon" className="lg:hidden text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Wishlist */}
                    <Button variant="ghost" size="icon" className="text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                        <Link to="/shop/wishlist">
                            <Heart className="h-5 w-5" />
                        </Link>
                    </Button>

                    {/* Cart with Notification Badge */}
                    <Button variant="ghost" size="icon" className="relative text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                        <Link to="/shop/cart">
                            <ShoppingBag className="h-5 w-5" />
                            {/* Cute pink dot for cart items */}
                            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-white">
                                2
                            </span>
                        </Link>
                    </Button>

                    {/* User Avatar Divider */}
                    <div className="h-8 w-[1px] bg-stone-200 mx-1 hidden sm:block"></div>

                    {/* User Profile Avatar */}
                    <Button variant="ghost" className="rounded-full p-1 hover:bg-rose-50 hidden sm:flex">
                        <Link to="/shop/profile">
                            <Avatar className="h-8 w-8 border border-stone-200">
                                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="@user" />
                                <AvatarFallback className="bg-rose-100 text-rose-900 text-xs">US</AvatarFallback>
                            </Avatar>
                        </Link>
                    </Button>

                </div>
            </div>
        </header>
    );
};

export default Navbar;