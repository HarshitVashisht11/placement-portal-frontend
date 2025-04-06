"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { StudentOnboardingSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const ProfileCreateForm = ({
  initialData,
  isOnboarded,
  categories,
}: {
  initialData: z.infer<typeof StudentOnboardingSchema> | null;
  isOnboarded: boolean;
  categories: any;
}) => {
  const [loading, setLoading] = useState(false);

  const title = isOnboarded ? "Edit Data" : "Finish Onboarding";
  const description = isOnboarded
    ? "Edit your profile data."
    : "Before you apply for job opportunities, we first need some basic information about you.";

  const toastMessage = "Profile Updated.";
  const action = initialData != null ? "Edit Form" : "Finish Onboarding";
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});

  const form = useForm<z.infer<typeof StudentOnboardingSchema>>({
    resolver: zodResolver(StudentOnboardingSchema),
    mode: "onChange",
    values: {
      marks10th: initialData?.marks10th,
      marks12th: initialData?.marks12th,
      sgpasem1: initialData?.sgpasem1,
      sgpasem2: initialData?.sgpasem2,
      sgpasem3: initialData?.sgpasem3,
      sgpasem4: initialData?.sgpasem4,
      sgpasem5: initialData?.sgpasem5,
      sgpasem6: initialData?.sgpasem6,
      cgpa: initialData?.cgpa,
      sgpaProofs: initialData?.sgpaProofs || "",
      collegeIdCard: initialData?.collegeIdCard || "",
      achievementCertificates: initialData?.achievementCertificates || "",
    },
  });

  const {
    formState,
  } = form;

  const updateOnboardingData = async (data: z.infer<typeof StudentOnboardingSchema>) => {
     try {
       const response = await api.put("/user/data", {
         ...data,
       });

       console.log("response", response);
       toast.success(toastMessage);

       // router.refresh();
     } catch (error) {
       console.log("error", error);
       toast.error("Something went wrong. Please try again later.");
     } finally {
       setLoading(false);
     }
  }

  const onSubmit = async (data: z.infer<typeof StudentOnboardingSchema>) => {
    setLoading(true);

    if(initialData) {
      updateOnboardingData(data);
      return;
    }

    try {
      const response = await api.post("/user/data", {
        ...data,
      });

      console.log("response", response);
      toast.success(toastMessage);

      // router.refresh();
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const processForm = (data: z.infer<typeof StudentOnboardingSchema>) => {
    console.log("HERE");
    console.log("data ==>", data);
    setData(data);
    // api call and reset
    // form.reset();
  };

  type FieldName = keyof z.infer<typeof StudentOnboardingSchema>;

  const steps = [
    {
      id: "Step 1",
      name: "Academic Record",
      fields: [
        "marks10th",
        "marks12th",
        "sgpasem1",
        "sgpasem2",
        "sgpasem3",
        "sgpasem4",
        "sgpasem5",
        "sgpasem6",
        "cgpa",
      ],
    },
    {
      id: "Step 2",
      name: "Documents",
      // fields are mapping and flattening for the error to be trigger  for the dynamic fields
      fields: ["sgpaProofs", "collegeIdCard", "achievementCertificates"],
    },
    { id: "Step 3", name: "Review" },
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    let err = false;
    const values = form.getValues(fields as FieldName[]);
    values.forEach((value, index) => {
      if (fields && !value) {
        form.setError(fields[index] as any, {
          type: "required",
          message: "This field is required",
        });

        err = true;
      }
    });

    if (err) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-tpc-red py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-tpc-red transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-tpctext-tpc-red py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-tpc-red">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              currentStep === 1
                ? "w-full md:inline-block"
                : "gap-8 md:grid md:grid-cols-3"
            )}
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="marks10th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Marks 10<sup>th</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter a numeric value without % sign."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marks12th"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Marks 12<sup>th</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter a numeric value without % sign."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgpasem1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Semester 1</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your Semester 1 SGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgpasem2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Semester 2</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your Semester 2 SGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgpasem3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Semester 3</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your Semester 3 SGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgpasem4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Semester 4</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your Semester 4 SGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgpasem5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Semester 5</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your Semester 5 SGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sgpasem6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Semester 6</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your Semester 6 SGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        CGPA(Till 6<sup>th</sup> Semester)
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter your CGPA"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="sgpaProofs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SGPA Proofs</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter a public drive link."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a public drive link for your SGPA proofs from Sem
                        1 to Sem 6.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="collegeIdCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter a drive link below."
                          {...field}
                        />
                      </FormControl>

                      <FormDescription>
                        Enter a public drive link for your College ID Card.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="achievementCertificates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achievements/Certifications.</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          required
                          placeholder="Enter a drive link below."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a public drive link for your Achievements and
                        Certifications in one pdf.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 2 && (
              <div className="col-span-3 p-6 bg-white shadow-lg rounded-lg space-y-6">
                <h1 className="text-2xl font-bold text-center text-sky-800">
                  Review Your Information
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(data).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-4 py-3 border border-gray-200 space-y-2 rounded-md bg-sky-50"
                    >
                      {key === "sgpaProofs" ||
                      key === "collegeIdCard" ||
                      key === "achievementCertificates" ? (
                        <>
                          <h3 className="text-sm mb-2 font-bold text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h3>
                          <Link
                            target="_blank"
                            href={(value as string) || ""}
                            className="underline text-base text-gray-800"
                          >
                            {(value as string) || "N/A"}
                          </Link>
                        </>
                      ) : (
                        <>
                          <h3 className="text-sm font-bold text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h3>
                          <p className="text-base text-gray-800">
                            {(value as string) || "N/A"}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={() => {
                      setCurrentStep(0)
                    }} // Function to go back and edit
                    className=""
                  >
                    Reset Form
                  </Button>

                  <Button
                    onClick={() => {
                      form.handleSubmit(processForm)();
                    }}
                    variant={"default"}
                    disabled={loading}
                    className=""
                  >
                    {action || "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileCreateForm;
