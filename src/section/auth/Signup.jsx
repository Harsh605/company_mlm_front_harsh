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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/slices/userSlice";

export function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCreated, userData, error } = useSelector(
    (state) => state.userCustom
  );
  const formSchema = z.object({
    firstName: z.string().min(2).max(15),
    lastName: z.string().min(2).max(15),
    mobileNo: z.string().min(10).max(10),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    cPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    referralId: z.string().min(20).max(30),
    userType: z.enum(["staff", "freelancer"]),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cPassword: "",
      mobileNo: "",
      referralId: "",
      userType: "",
    },
  });
  const onSubmit = (value) => {
    console.log(value);
    dispatch(
      register({
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        referralId: value.referralId,
        password: value.password,
        mobileNo: value.mobileNo,
        userType: value.userType,
      })
    );
  };

  return (
    <div className="mt-10 mb-10 min-h-screen flex justify-center items-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
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
              <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="fName">First Name</FormLabel>
                        <FormControl>
                          <Input
                            id="fName"
                            type="text"
                            placeholder="First Name"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="referralId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="referralId">Referral Id</FormLabel>
                      <FormControl>
                        <Input
                          id="referralId"
                          type="text"
                          placeholder="Referral Id"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="referralId">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
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
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="referralId">Mobile No</FormLabel>
                      <FormControl>
                        <Input
                          id="mobileNo"
                          type="text"
                          placeholder="Mobile No."
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
                        <Input
                          id="password"
                          type="text"
                          placeholder="Password"
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
                  name="cPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="cPassword"
                          type="text"
                          placeholder="cPassword"
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
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="userType">User Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select User Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="staff">Staff</SelectItem>
                              <SelectItem value="freelancer">
                                Freelancer
                              </SelectItem>
                              {/* Add more options as needed */}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <span className="text-gray-400 text-sm">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="text-gray-400 text-sm font-semibold"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
