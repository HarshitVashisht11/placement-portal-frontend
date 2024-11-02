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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { coerce, z } from "zod";

interface ProfileFormType {
  initialData: any | null;
  categories: any;
}

const googleDriveLinkRegex = /^(https:\/\/)?(drive\.google\.com)/;

const studentOnboardingSchema = z.object({
  resumeLink: z
    .string()
    .min(1, "Please enter a valid link")
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link")
    .optional(),
  marks10th: z.coerce
    .number()
    .min(1, "Please enter a valid mark or percentage")
    .max(100, "Maximum allowed is 100")
    .optional(),
  sgpaSem1: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpaSem2: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpaSem3: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpaSem4: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpaSem5: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpaSem6: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  marks12th: z.coerce
    .number()
    .min(1, "Please enter a valid mark or percentage")
    .max(100, "Maximum allowed is 100")
    .optional(),
  sgpaProofs: z
    .string()
    .min(1, "Please enter a valid link")
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link")
    .optional(),
  collegeIdCard: z
    .string()
    .min(1, "Please enter a valid link")
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link")
    .optional(),
  achievementCertificates: z
    .string()
    .min(1, "Please enter a valid link")
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link")
    .optional(),
});

const ProfileCreateForm: React.FC<ProfileFormType> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = "Finish Onboarding";
  const description =
    "Before you apply for job opportunities, we first need some basic information about you.";
  const toastMessage = "Profile Updated.";
  const action = "Finish Onboarding";
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const delta = currentStep - previousStep;

  const form = useForm<z.infer<typeof studentOnboardingSchema>>({
    resolver: zodResolver(studentOnboardingSchema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof studentOnboardingSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/admin/dashboard/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const processForm = (data: z.infer<typeof studentOnboardingSchema>) => {
    console.log("HERE");
    console.log("data ==>", data);
    setData(data);
    // api call and reset
    // form.reset();
  };

  type FieldName = keyof z.infer<typeof studentOnboardingSchema>;

  const steps = [
    {
      id: "Step 1",
      name: "Academic Record",
      fields: [
        "marks10th",
        "marks12th",
        "sgpaSem1",
        "sgpaSem2",
        "sgpaSem3",
        "sgpaSem4",
        "sgpaSem5",
        "sgpaSem6",
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
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
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
          onSubmit={form.handleSubmit(processForm)}
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
                  name="sgpaSem1"
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
                  name="sgpaSem2"
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
                  name="sgpaSem3"
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
                  name="sgpaSem4"
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
                  name="sgpaSem5"
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
                  name="sgpaSem6"
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
              <div>
                <h1>Completed</h1>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(data)}
                </pre>
                <Button
                  onClick={() => {
                    console.log("submitting form 1");
                    form.handleSubmit(processForm)();
                  }}
                  disabled={loading}
                  className="ml-auto"
                >
                  {action}
                </Button>
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
