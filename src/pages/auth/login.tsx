import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "@/redux/services/authApi";
import { setRole, setToken } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Eye, EyeOff } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data).unwrap();
      
      if (!response || response.status.toLowerCase() !== "success") return;
      
      form.reset();
      dispatch(setToken(response.token));
      
      if (response.data) {
        dispatch(setRole(response.data.role));

        if (response.data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.data.role === "user") {
          navigate("/shop/home");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      
      {/* Background Watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[4%] mix-blend-luminosity">
        <img 
          src="https://i.pinimg.com/1200x/8f/8e/76/8f8e76542303859ea8cbb2b3ce5d707c.jpg" 
          alt="background texture" 
          className="h-full w-full object-cover object-center" 
        />
      </div>

      {/* Premium Form Card */}
      <div className="z-10 w-full max-w-md rounded-2xl border bg-white/50 p-8 shadow-xl shadow-black/5 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-black/50 dark:shadow-white/5 sm:p-10">
        <div className="mb-8 flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input 
              id="email" 
              type="email"
              placeholder="name@example.com" 
              className={`transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              {...register("email")} 
            />
            {errors.email && (
              <span className="animate-in fade-in text-xs font-medium text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input with Toggle */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className={`pr-10 transition-colors ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("password")} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </button>
            </div>
            {errors.password && (
              <span className="animate-in fade-in text-xs font-medium text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full font-medium transition-all hover:shadow-md active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link 
            to="/auth/register" 
            className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;