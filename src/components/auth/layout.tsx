import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    // Changed min-h-screen to h-[100dvh] so the overall page never scrolls, only the designated areas.
    <div className="flex h-[100dvh] w-full bg-background transition-colors duration-300">
      
      {/* Left Side - Static Image & Branding */}
      <div className="relative hidden h-full w-1/2 overflow-hidden lg:flex">
        <img
          src="https://i.pinimg.com/1200x/9c/19/91/9c199105111bb4ff5e142d01f65474db.jpg"
          alt="Authentication background"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        
        {/* Modern Logo & Calligraphy Branding (Top Left) */}
        <div className="absolute left-10 top-10 flex items-center gap-3 text-white">
          <span 
            className="text-4xl drop-shadow-md" 
            style={{ fontFamily: "'Dancing Script', 'Brush Script MT', 'Caveat', cursive" }}
          >
            PikaPika
          </span>
        </div>

        {/* Text Content (Bottom Left) */}
        <div className="absolute bottom-12 left-10 right-10 flex flex-col gap-3 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md xl:text-5xl">
            Welcome Back
          </h1>
          <p className="max-w-md text-base font-medium leading-relaxed text-white/80 drop-shadow">
            Manage your account, explore new features, and stay connected seamlessly.
          </p>
        </div>
      </div>

      {/* Right Side - Scrollable Auth Form Container */}
      {/* Added overflow-y-auto and h-full so this specific side scrolls if the form is tall */}
      <div className="flex h-full flex-1 flex-col items-center overflow-y-auto p-6 sm:p-12 lg:p-16">
        
        {/* Wrapper to handle vertical centering safely (prevents top cut-off on tall forms) */}
        <div className="flex w-full max-w-md flex-1 flex-col justify-center py-6">
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <Outlet />
          </div>
        </div>

        {/* Auth Layout Footer / Helpful Links */}
        {/* Removed absolute positioning so it gracefully stays at the bottom of the scroll view */}
        <div className="mt-auto flex w-full max-w-md justify-center gap-4 py-4 text-sm text-gray-500 dark:text-gray-400">
          <Link 
            to="/forgot-password" 
            className="transition-colors hover:text-black dark:hover:text-white hover:underline"
          >
            Forgot password?
          </Link>
          <span>&bull;</span>
          <Link 
            to="/support" 
            className="transition-colors hover:text-black dark:hover:text-white hover:underline"
          >
            Need help?
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;