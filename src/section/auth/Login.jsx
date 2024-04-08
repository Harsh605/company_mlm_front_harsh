import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/slices/userSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToast } from "@/lib/helper";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, userData, error } = useSelector(
    (state) => state.userCustom
  );
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value) => {
    errorToast("asda");
    dispatch(login({ email: value.email, password: value.password }));
    // if(isAuthenticated){
    //   isAuthenticated
    // }
  };

  return (
    <div className="mt-10 mb-10 min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login your account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" disabled>
                  <i className="fab fa-google mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" disabled>
                  <i className="fab fa-facebook mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid gap-2 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* <Link
                className="inline-block align-baseline text-sm text-gray-400 hover:text-gray-800"
                to="/forgot"
              >
                Forgot Password?
              </Link> */}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div>
                <Link
                  to="/signup"
                  className="text-gray-400 text-sm font-semibold"
                >
                  <span className="text-gray-400 text-sm font-normal">
                   Not a Member? 
                  </span>
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
