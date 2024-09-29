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
import { LoginSchema } from "@/schemas/schema";
import { api } from "@/lib/api";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import FormError from "@/components/form/FormError";
import toast from "react-hot-toast";

const Login = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const [error, setError] = useState<string>();
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      try {
        const response = await api.post("/login", {
          email: data.email,
          password: data.password,
        });
        if (response.status === 200) {
          router.replace("/");
        }

        console.log(response.data);
      } catch (error: any) {
        if(error.response.status == 403) {
          setError(error.response.data.error);
          toast.error("Verify your Email to Login!")
        }
      }
    });
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
                Create an account
              </span>
            </Link>
          </nav>
        </header>
        <Form {...form}>
          <div className="pb-24 w-full max-w-sm">
            <span className="text-4xl text-center w-full flex justify-center">
              Welcome back
            </span>
            <p className="text-center text-lg mb-6 mt-2 text-slate-600">
              Enter your account details below.
            </p>
            <hr className="my-4 " />
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              {/* <Alert>
                      <BookOpenCheck className="h-4 w-4" />
                      <AlertTitle>Heads up!</AlertTitle>
                      <AlertDescription>
                      You can now make your notes public for the community.
                      </AlertDescription>
                      </Alert> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
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
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                    You can quickly jump to a timestamp in the video from your
                    note.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pb-6 items-center">
                <Link
                  className="text-sm text-slate-800 underline font-medium"
                  href="/"
                >
                  Forgot Password
                </Link>
              </div>
              {error && <FormError message={error} />}
              <Button
                disabled={isLoading}
                className="w-full font-bold"
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
        </Form>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
