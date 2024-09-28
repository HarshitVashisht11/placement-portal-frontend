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
import { useState, useTransition } from "react";
import { Branch } from "@/schemas/types";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { toast } from "react-hot-toast";

const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [studentType, setStudentType] = useState<"CO" | "MCO" | "LCO">();
  const [isStep2, setIsStep2] = useState<boolean>(false); // Flag to handle step transition
  const [email, setEmail] = useState<string>();
  const [rollnum, setRollnum] = useState<string>();
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
    if (!isStep2) {
      // Step 1: Verify Roll Number and Calculate Year of Admission + Branch
      const year = data.rollnum.slice(0, 2);
      const yearInNum = parseInt("20" + year);
      setYearofadmission(yearInNum);

      // roll number
      setRollnum(studentType + data.rollnum);

      // Set branch
      const branchNum = data.rollnum.charAt(2);
      switch (branchNum) {
        case "3":
          setBranch(Branch.CSE);
          break;
        case "5":
          setBranch(Branch.ECE);
          break;
        case "2":
          setBranch(Branch.CIVIL);
          break;
        case "1":
          setBranch(Branch.MECH);
          break;
        default:
          break;
      }

      // Set email based on student type and roll number
      setEmail(studentType?.toLowerCase() + data.rollnum + "@ccet.ac.in");

      // Move to Step 2
      setIsStep2(true);
      return;
    }

    // Step 2: Submit form data
    startTransition(async () => {
      try {
        const response = await api.post("/signup", {
          email: data.email,
          rollnum: rollnum,
          year_of_admission: yearofadmission,
          branch: branch,
          name: data.name,
          password: data.password,
        });
        console.log(response);
        if (response.status === 200) {
          toast.success("Registration Successful!");
          setTimeout(() => {
            router.push("/auth/login")
          }, 2000);
        }

        // You can add router logic to redirect after successful registration
      } catch (error) {
        toast.error("Some Error Occured!");
        setIsStep2(false);
        console.log(error);
      }
    });
  }

  // Framer Motion Animation Variants
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

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
              href={"/auth/login"}
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
              {isStep2
                ? "Enter your Personal Details below."
                : "Enter your Roll Number below to register."}
            </p>
            <hr className="my-4" />

            {/* Step Transition */}
            <AnimatePresence mode="wait">
              {/* Step 1: Roll Number Verification */}
              {!isStep2 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
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

                    <FormField
                      control={form.control}
                      name="rollnum"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roll Number</FormLabel>
                          <FormControl>
                            <div className="w-full flex items-end justify-between gap-x-2">
                              <InputOTP
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
                                type="submit"
                              >
                                Verify
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </motion.div>
              )}

              {/* Step 2: Additional Fields After Verification */}
              {isStep2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                  >
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
                    <div className="gap-x-2 flex w-full">
                      <FormField
                        control={form.control}
                        name="fullrollnum"
                        defaultValue={rollnum}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roll Number</FormLabel>
                            <FormControl>
                              <Input
                                disabled
                                placeholder={rollnum}
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
                    </div>
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
                    <div className="flex gap-x-2">
                      <Button
                        disabled={isLoading}
                        onClick={() => {
                          setIsStep2(false);
                        }}
                        variant={"secondary"}
                        className="inline-flex w-full"
                        type="button"
                      >
                        Back
                      </Button>
                      <Button
                        disabled={isLoading}
                        className="inline-flex w-full"
                        type="submit"
                      >
                        Register
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Form>

        <footer className="h-12 flex items-center justify-between w-full px-8">
          <span className="font-light text-xs">© 2024 kay-sikh</span>
        </footer>
      </div>
      <div className="flex justify-center items-center w-full h-full bg-gradient-to-tr from-indigo-500 to-blue-400">
        <h1 className="text-white text-6xl text-center font-bold">
          Chandigarh College of Engineering and Technology
        </h1>
      </div>
    </div>
  );
};

export default Register;
