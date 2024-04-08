// import { Metadata } from "next"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select } from "@radix-ui/react-select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
import { useNavigate } from "react-router-dom";
import { loadUser, updateProfile } from "@/slices/userSlice";

export default function Profile({ userData }) {
  const { t } = useTranslation();
  const [openForProfilePhoto, setOpenForProfilePhoto] = useState(false);

  const [avatar, setAvatar] = useState("/images/profile-pic.jpeg");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/profile-pic.jpeg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImgUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const formSchema = z.object({
    name: z.string().optional(),
    mobileNo: z.number().default(userData?.mobileNo).optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    // avatar: z.string().optional(),
    userId: z.number().optional(),
    referralId: z.string().optional(),
    referralName: z.string().optional(),
    joiningDate: z.string().optional(),

    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    whatsapp: z.string().optional(),
    telegram: z.string().optional(),
    twitter: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      mobileNo: userData?.mobileNo || "",
      city: userData?.city || "",
      state: userData?.state || "",
      address: userData?.address || "",
      // avatar: userData?.avatar || "",
      userId: userData?.userId || "",
      referralId: userData?.parentId || "",
      referralName: userData?.parentName || "",
      joiningDate: (userData?.createdAt).slice(0, 10) || "",
      linkedin: userData?.socialLinks?.linkedin || "",
      facebook: userData?.socialLinks?.facebook || "",
      instagram: userData?.socialLinks?.instagram || "",
      whatsapp: userData?.socialLinks?.whatsapp || "",
      telegram: userData?.socialLinks?.telegram || "",
      twitter: userData?.socialLinks?.twitter || "",
    },
  });

  const onGeneralInformationSubmit = (value) => {
    console.log(value);
    dispatch(
      updateProfile({
        name: value.name,
        mobileNo: value.mobileNo,
        // avatar,
        city: value.city,
        state: value.state,
        address: value.address,
        socialLinks: {
          linkedin: value.linkedin,
          facebook: value.facebook,
          instagram: value.instagram,
          whatsapp: value.whatsapp,
          telegram: value.telegram,
          twitter: value.twitter,
        },
      })
    ).then(() => dispatch(loadUser()));
  };
  const onSocialInformationSubmit = (value) => {
    console.log(value);
    const socialLinks = {
      linkedin: value.linkedin,
      facebook: value.facebook,
      instagram: value.instagram,
      whatsapp: value.whatsapp,
      telegram: value.telegram,
      twitter: value.twitter,
    }; // Removed the comma here
    dispatch(
      updateProfile({
        socialLinks,
      })
    );
  };

  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-2 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("My Profile")}
            </h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <Button>Download</Button> */}
            </div>
          </div>
          <Tabs defaultValue="General" className="space-y-4">
            <TabsList>
              <TabsTrigger value="General">General</TabsTrigger>
              <TabsTrigger value="Account">Account</TabsTrigger>
              <TabsTrigger value="KycDetails">KYC Details</TabsTrigger>
              <TabsTrigger value="socialDetails">Social Details</TabsTrigger>
            </TabsList>
            <TabsContent value="General" className="space-y-4">
              <div>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                      General Information
                    </CardTitle>
                    <CardDescription>
                      Enter your full information for better understanding
                    </CardDescription>
                  </CardHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onGeneralInformationSubmit)}
                      className="space-y-8"
                    >
                      <CardContent className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="name">Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="name"
                                      type="text"
                                      placeholder="Name"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="userId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="UserId">UserId</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="UserId"
                                      type="text"
                                      placeholder="UserId"
                                      disabled
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="UserId">Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="email"
                                      type="email"
                                      placeholder="Email"
                                      disabled
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="mobileNo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="mobileNo">
                                    Mobile No
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="mobileNo"
                                      type="text"
                                      placeholder="Mobile No"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="City">City</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="city"
                                      type="text"
                                      placeholder="City"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="State">State</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="State"
                                      type="text"
                                      placeholder="State"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="Address">
                                    Address
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="Address"
                                      type="text"
                                      placeholder="Address"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="joiningDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="joiningDate">
                                    Joining Date
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="joiningDate"
                                      type="text"
                                      placeholder="dd/mm/yyyy"
                                      disabled
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="referralId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="referralId">
                                    Referral Id
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="referralId"
                                      type="text"
                                      placeholder="Referral Id"
                                      disabled
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="referralName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="referralName">
                                    Referral Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="referralName"
                                      type="text"
                                      placeholder="Referral Name"
                                      disabled
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <Label className="mb-1">Profile Photo</Label>
                            <div className="flex">
                              <label
                                htmlFor="dropzone-file"
                                className="w-full  border border-foreground bg-transparent rounded-lg cursor-pointer "
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                  <div className="flex w-full items-center justify-center gap-4">
                                    <div className="w-1/2 flex justify-center item-center">
                                      <img
                                        src={avatar}
                                        style={{
                                          width: "100%",
                                          maxWidth: "120px",
                                          borderRadius: "8px",
                                        }}
                                        alt="Avatar Preview"
                                      />
                                    </div>
                                    <div className="w-1/2">
                                      <svg
                                        aria-hidden="true"
                                        className="w-10 h-10 mb-3 "
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                      </svg>
                                      <p className="mb-2 text-sm text-foreground ">
                                        <span className="font-semibold">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-xs text-foreground">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <input
                                  type="file"
                                  name="file"
                                  id="dropzone-file"
                                  onChange={handleImgUpload}
                                  accept="image/*"
                                  className=" hidden px-4 py-2 transition duration-300  focus:border-transparent focus:outline-none focus:ring-4"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Update</Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="Account" className="space-y-4">
              <div>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                      Accounting Information
                    </CardTitle>
                    <CardDescription>
                      Enter your full information for better understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                      <div className="grid gap-2 ">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          type="text"
                          placeholder="Bank Name"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="accountHolderName">
                          Account Holder Name
                        </Label>
                        <Input
                          id="accountHolderName"
                          type="text"
                          placeholder="Account Holder Name"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="accountNo">Account No</Label>
                        <Input
                          id="accountNo"
                          type="text"
                          placeholder="Account No"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="ifscCode">IFSC Code</Label>
                        <Input
                          id="ifscCode"
                          type="text"
                          placeholder="IFSC Code"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="upiId">Enter Upi Id</Label>
                        <Input
                          id="upiId"
                          type="text"
                          placeholder="Enter Upi Id"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Update</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="KycDetails" className="space-y-4">
              <div>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">KYC Information</CardTitle>
                    <CardDescription>
                      Please fill your kyc information for better understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                      <div className="grid gap-2 ">
                        <Label htmlFor="aadharCard">Aadhar Card</Label>
                        <Input
                          id="aadharCard"
                          type="text"
                          placeholder="Aadhar Card"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="pancardNo">Pancard No</Label>
                        <Input
                          id="pancardNo"
                          type="text"
                          placeholder="Pancard No"
                        />
                      </div>

                      <div className="grid gap-2 ">
                        <Label htmlFor="aadharFront">
                          Aadhar Card Front Photo
                        </Label>
                        <Input
                          id="aadharFront"
                          type="file"
                          className="text-foreground"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="aadharBack">
                          Aadhar Card Back Photo
                        </Label>
                        <Input
                          id="aadharBack"
                          type="file"
                          className="text-foreground"
                        />
                      </div>
                      <div className="grid gap-2 ">
                        <Label htmlFor="panFront">Pan Card Front Photo</Label>
                        <Input
                          id="panFront"
                          type="file"
                          className="text-foreground"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Update</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="socialDetails" className="space-y-4">
              <div>
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                      Social Information
                    </CardTitle>
                    <CardDescription>
                      Enter your Social information for better understanding
                    </CardDescription>
                  </CardHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSocialInformationSubmit)}
                      className="space-y-8"
                    >
                      <CardContent className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="linkedin">
                                    Linkedin
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="linkedin"
                                      type="text"
                                      placeholder="Enter Your Linkedin Id"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="facebook"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="facebook">
                                    Facebook
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="facebook"
                                      type="text"
                                      placeholder="Enter Your Facebook Id"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="instagram"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="instagram">
                                    Instagram
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="instagram"
                                      type="text"
                                      placeholder="Enter Your Instagram Id"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="whatsapp"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="Whatsapp">
                                    Whatsapp
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="Whatsapp"
                                      type="text"
                                      placeholder="Enter Your whatsapp Id"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="telegram"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="Telegram">
                                    Telegram
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="Telegram"
                                      type="text"
                                      placeholder="Enter Your telegram Id"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-2 ">
                            <FormField
                              control={form.control}
                              name="twitter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="Twitter">
                                    Twitter
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="Twitter"
                                      type="text"
                                      placeholder="Enter Your Twitter Id"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button type="submit" className="w-full">
                          Update
                        </Button>
                      </CardFooter>
                    </form>
                  </Form>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
