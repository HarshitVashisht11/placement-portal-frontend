"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { RegisterSchema } from "@/schemas/schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Branch } from "@/schemas/types";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  // const router = useRouter()

  const [studentType, setStudentType] = useState<"CO" | "MCO" | "LCO">();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [yearofadmission, setYearofadmission] = useState<number>();
  const [branch, setBranch] = useState<Branch>();

  function handleStudentTypeChange(value: string) {
    switch (value) {
      case "Regular":
        setStudentType("CO");
        break;
      case "PU Meet":
        setStudentType("MCO");
        break;
      case "Leet":
        setStudentType("LCO");
        break;
      default:
        break;
    }
  }

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    if (!isVerified) {
      // settign year of admission from rollnum
      const year = data.rollnum.slice(0, 2);
      const yearInNum = parseInt("20" + year);
      setYearofadmission(yearInNum);

      // branch
      const branchNum = data.rollnum.charAt(2);
      switch (branchNum) {
        case "3":
          setBranch(Branch.CSE);
          break;

        case "5":
          setBranch(Branch.ECE);

        case "2":
          setBranch(Branch.CIVIL);

        case "1":
          setBranch(Branch.MECH);

        default:
          break;
      }

      setEmail(studentType?.toLowerCase() + data.rollnum + "@ccet.ac.in");
      setIsVerified(true);
      return;
    }
    console.log(data);

    try {
      const response = await api.post("/signup", {
        email: data.email,
        rollnum: studentType?.toLowerCase() + data.rollnum,
        "year_of_admission": yearofadmission,
        branch: branch,
        name: data.name,
        password: data.password,
      });
      console.log(response)

      // const xsrfToken = response.headers["x-csrf-token"];
      // setxcsrfToken(xsrfToken);
      // const callback = searchParams.get("callback");
      // if (callback) {
      //   router.replace(`/${callback}`);
      // } else {
      //   router.replace("/");
      // }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex flex-col justify-between items-center w-full h-full">
        <header className="h-14 flex items-center mt-4 w-full px-6">
          <nav className="flex w-full justify-between">
            <Link
              href="/"
              className="flex items-center gap-x-2 justify-center"
              prefetch={false}
            >
              <GraduationCap />
              <span className="font-bold text-lg">Placement Portal</span>
            </Link>
            <Link
              className="flex items-center gap-x-1 justify-center"
              href={"/auth/register"}
            >
              <span className="font-light underline text-base">
                Already have an account?
              </span>
            </Link>
          </nav>
        </header>
        <Form {...form}>
          <div className="pb-24 w-full max-w-sm">
            <span className="text-4xl text-center w-full flex justify-center">
              Welcome to TPC Portal
            </span>
            <p className="text-center text-lg mb-6 mt-2 text-slate-600">
              Enter your Roll Number below to register.
            </p>
            <hr className="my-4 " />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="student_type"
                render={({ field }) => (
                  <FormItem aria-required>
                    <FormLabel>Student Type</FormLabel>
                    <Select
                      disabled={isVerified}
                      required
                      onValueChange={(event) => {
                        field.onChange(event);
                        handleStudentTypeChange(event);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Student Type." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem textValue="Regular" value="Regular">
                          Regular
                        </SelectItem>
                        <SelectItem textValue="PU Meet" value="PU Meet">
                          PU MEET
                        </SelectItem>
                        <SelectItem textValue="Leet" value="Leet">
                          LEET
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <FormField
                  control={form.control}
                  name="rollnum"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl>
                          <div className="w-full flex items-end justify-between gap-x-2">
                            <InputOTP
                              disabled={isVerified}
                              className="inline"
                              maxLength={5}
                              {...field}
                            >
                              {studentType && (
                                <>
                                  <Input
                                    type="text"
                                    className="w-16"
                                    value={studentType}
                                    disabled
                                  />
                                  <InputOTPSeparator />
                                </>
                              )}
                              <InputOTPGroup className="text-black">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                              </InputOTPGroup>
                            </InputOTP>
                            <Button
                              className="inline-flex w-full"
                              disabled={isVerified}
                            >
                              {isVerified ? "Verified" : "Verify"}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
              {isVerified && (
                <button
                  onClick={() => {
                    setIsVerified(false);
                  }}
                  className="text-right w-full text-sm text-gray-600 "
                >
                  Change Roll Number?
                </button>
              )}
              {isVerified && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    defaultValue={email}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            required
                            disabled
                            placeholder={email}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year_of_admission"
                    defaultValue={yearofadmission}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Of Admission</FormLabel>
                        <FormControl>
                          <Input
                            required
                            disabled
                            placeholder={yearofadmission?.toString()}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch"
                    defaultValue={branch}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <FormControl>
                          <Input
                            required
                            disabled
                            placeholder={branch}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            required
                            placeholder="Enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full font-bold" type="submit">
                    Register
                  </Button>
                </>
              )}
            </form>
          </div>
        </Form>
        <div></div>
      </div>
      <div>
        {/* <Image
          className="h-full bg-cover w-full"
          src={"/images/auth.jpg"}
          width={1200}
          height={1200}
          alt="bg"
        /> */}
      </div>
    </div>
  );
};

export default Register;
