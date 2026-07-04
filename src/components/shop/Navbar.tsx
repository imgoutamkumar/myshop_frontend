"use client";

import React, { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom"; // Assuming you are using react-router

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Optional: Close mobile menu when route changes
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200/50 bg-white/80 backdrop-blur-md transition-all">
        <div className="flex h-20 items-center justify-between max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* LEFT: Mobile Menu Button & Brand */}
          <div className="flex items-center gap-4 lg:gap-10">
            
            {/* Mobile Hamburger Menu */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-stone-600 hover:text-rose-600 hover:bg-rose-50"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Brand Logo */}
            <Link to="/shop/home" className="flex items-center gap-2">
              <span
                className="text-3xl font-semibold tracking-tight text-rose-900 drop-shadow-xs"
                style={{ fontFamily: "'Dancing Script', 'Brush Script MT', 'Caveat', cursive" }}
              >
                PikaPika.
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex gap-8">
              <Link to="/shop/home" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">
                Home
              </Link>
              <Link to="/shop/products" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">
                Products
              </Link>
              <Link to="/shop/collections" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">
                Collections
              </Link>
            </nav>
          </div>

          {/* MIDDLE: Desktop Search Bar */}
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

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Wishlist */}
            <Link to="/shop/wishlist">
              <Button variant="ghost" size="icon" className="text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart with Notification Badge */}
            <Link to="/shop/cart">
              <Button variant="ghost" size="icon" className="relative text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-white">
                  2
                </span>
              </Button>
            </Link>

            {/* User Avatar Divider (Hidden on very small screens) */}
            <div className="h-8 w-[1px] bg-stone-200 mx-1 hidden sm:block"></div>

            {/* User Profile Avatar (Desktop/Tablet) */}
            <Link to="/shop/profile" className="hidden sm:block">
              <Button variant="ghost" className="rounded-full p-1 hover:bg-rose-50">
                <Avatar className="h-8 w-8 border border-stone-200">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="@user" />
                  <AvatarFallback className="bg-rose-100 text-rose-900 text-xs">US</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search Dropdown Area */}
        <div className={`lg:hidden w-full overflow-hidden transition-all duration-300 ease-in-out bg-white ${isSearchOpen ? "max-h-24 border-b border-stone-200 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 pb-4 pt-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-5 rounded-full bg-stone-100 border-transparent focus:bg-white focus:border-rose-200 focus:ring-2 focus:ring-rose-100 font-light text-stone-700 placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          MOBILE MENU OVERLAY & DRAWER
          ========================================= */}
      
      {/* Dark Overlay Background */}
      <div 
        className={`fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-stone-100">
          <span className="text-2xl font-semibold tracking-tight text-rose-900" style={{ fontFamily: "'Dancing Script', cursive" }}>
            PikaPika.
          </span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-400 hover:text-stone-900">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-6 py-8 gap-6 flex-1 overflow-y-auto">
          <Link to="/shop/home" className="flex items-center justify-between text-lg font-medium text-stone-800 hover:text-rose-600 transition-colors group">
            Home
            <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-rose-400 transition-colors" />
          </Link>
          <Link to="/shop/products" className="flex items-center justify-between text-lg font-medium text-stone-800 hover:text-rose-600 transition-colors group">
            Products
            <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-rose-400 transition-colors" />
          </Link>
          <Link to="/shop/collections" className="flex items-center justify-between text-lg font-medium text-stone-800 hover:text-rose-600 transition-colors group">
            Collections
            <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-rose-400 transition-colors" />
          </Link>
        </nav>

        {/* Drawer Footer (Profile Access for Mobile) */}
        <div className="p-6 border-t border-stone-100 bg-stone-50">
          <Link to="/shop/profile" className="flex items-center gap-4 group">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces" alt="@user" />
              <AvatarFallback className="bg-rose-100 text-rose-900">US</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-stone-900">My Account</span>
              <span className="text-xs text-stone-500 font-light">View profile & orders</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;