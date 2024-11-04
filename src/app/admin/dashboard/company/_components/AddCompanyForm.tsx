"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import PageContainer from "@/components/layout/page-container";
import { Modal } from "@/components/ui/modal"; // Assuming you have a modal component
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  hrName: z.string().min(1, "HR Name is required"),
  overview: z
    .string()
    .max(500, "Overview cannot exceed 500 characters")
    .min(1, "Overview is required"),
  contactEmail: z.string().email("Enter a valid email"),
  contactNumber: z
    .string()
    .min(10, "Enter a valid contact number")
    .max(10, "Enter a valid contact number")
    .regex(/^\+?[1-9]\d{1,14}$/, "Enter a valid contact number"),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function CompanyForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<CompanyFormValues | null>(null);
  const router = useRouter();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      hrName: "",
      overview: "",
      contactEmail: "",
      contactNumber: "",
      linkedIn: "",
      website: "",
    },
  });

  // Handle the form submission by opening the modal with form data
  const handleModalSubmit = (data: CompanyFormValues) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  // Confirm the form submission after modal confirmation
  const confirmSubmission = async () => {
    if (formData) {
      setIsModalOpen(false);
      // Add your form submission logic here
      toast.loading("Adding company...");
      try {
        const response = await api.post("/company", formData);
        if (response.status === 201) {
          // Show success message
          toast.dismiss();
          toast.success("Company added successfully");
          setTimeout(() => {
            router.push("/admin/dashboard/overview");
          }, 2000);
        }
      } catch (error) {
        // Show error message
        toast.dismiss();
        toast.error("Failed to add company");
      }
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-left text-2xl font-bold">
              Add New Company
            </CardTitle>
            <CardDescription>
              Fill in the details of the company you want to add.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleModalSubmit)}
                className="grid grid-cols-2 gap-x-4 gap-y-4"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Name</Label>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="hrName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>HR Name</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter the name of company HR in contact"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="contactEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Contact Email</Label>
                      <FormControl>
                        <Input placeholder="Enter contact email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="contactNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Contact Number</Label>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="linkedIn"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>
                        LinkedIn{" "}
                        <span className="text-gray-400 text-sm">
                          (Optional)
                        </span>
                      </Label>

                      <FormControl>
                        <Input
                          placeholder="Enter LinkedIn profile URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="website"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label>
                        Website{" "}
                        <span className="text-gray-400 text-sm">
                          (Optional)
                        </span>
                      </Label>

                      <FormControl>
                        <Input placeholder="Enter website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Overview */}
                <FormField
                  name="overview"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <Label>Overview</Label>
                      <FormControl>
                        <Textarea
                          placeholder="Enter company overview (max 500 characters)"
                          maxLength={500}
                          {...field}
                        />
                      </FormControl>
                      <div className="text-right text-sm text-gray-500">
                        {field.value.length} / 500 characters
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button className="w-fit" type="submit" variant="default">
                  Submit
                </Button>
              </form>
            </Form>

            {/* Confirmation Modal */}
            <Modal
              title="Form Confirmation"
              description="Please Confirm before submitting the form"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <div className="bg-white p-4">
                {formData && (
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> {formData.name}
                      <p></p>
                      <strong>HR Name:</strong> {formData.hrName}
                    </p>
                    <p>
                      <strong>Contact Email:</strong> {formData.contactEmail}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {formData.contactNumber}
                    </p>
                    {formData.linkedIn && (
                      <p>
                        <strong>LinkedIn:</strong>{" "}
                        <Link href={formData.linkedIn}>
                          {formData.linkedIn}
                        </Link>
                      </p>
                    )}
                    {formData.website && (
                      <p>
                        <strong>Website:</strong>{" "}
                        <Link href={formData.website}>{formData.website}</Link>
                      </p>
                    )}
                    <p className="line-clamp-5 text-ellipsis w-full">
                      <strong>Overview:</strong> {formData.overview}
                    </p>
                  </div>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={confirmSubmission} variant="default">
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
