import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/redux/services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomInput } from "@/customComponent/input";
import { Form } from "@/components/ui/form";
import { CustomSelect } from "@/customComponent/select";
import { Loader2 } from "lucide-react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

const registerFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullname: z.string().min(1, "Full name is required"),
  gender: z.string().min(1, "Please select a gender"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      fullname: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterFormSubmit = async (values: RegisterFormValues) => {
    try {
      // unwrap() helps catch RTK Query errors properly in the catch block
      await register(values).unwrap();
      form.reset();
      
      // Navigate to login after successful registration
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      
      {/* Background Watermark (Matches Login) */}
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
            Create an account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your details to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRegisterFormSubmit)} className="flex flex-col gap-4">
            
            {/* Grid for side-by-side inputs (Saves vertical space) */}
          
              <CustomInput control={form.control} name="username" label="Username" />
              <CustomInput control={form.control} name="fullname" label="Full Name" />
            

            <CustomSelect 
              control={form.control} 
              name="gender" 
              label="Gender" 
              options={genderOptions} 
            />
            
            <CustomInput control={form.control} name="email" label="Email" />
            
            <CustomInput 
              control={form.control} 
              name="password" 
              label="Password" 
              type="password" 
            />
            
            <CustomInput 
              control={form.control} 
              name="confirmPassword" 
              label="Confirm Password" 
              type="password" 
            />

            <Button
              className="mt-4 w-full font-medium transition-all hover:shadow-md active:scale-[0.98]"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link 
            to="/auth/login" 
            className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;