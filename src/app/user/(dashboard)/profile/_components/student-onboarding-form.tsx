import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TooltipContent } from "@radix-ui/react-tooltip";

// UI components

const googleDriveLinkRegex = /^(https:\/\/)?(drive\.google\.com)/;

const studentOnboardingSchema = z.object({
  resumeLink: z
    .string()
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link"),
  marks10th: z
    .number()
    .positive("Please enter a valid mark or percentage")
    .max(100, "Maximum allowed is 100"),
  marks12th: z
    .number()
    .positive("Please enter a valid mark or percentage")
    .max(100, "Maximum allowed is 100"),
  sgpaProofs: z
    .string()
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link"),
  collegeIdCard: z
    .string()
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link"),
  achievementCertificates: z
    .string()
    .url("Invalid URL")
    .regex(googleDriveLinkRegex, "Must be a Google Drive link"),
});

const StudentOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(studentOnboardingSchema),
  });

  const next = async () => {
    const valid = await trigger();
    if (valid) setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Perform API call here with form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Student Onboarding Form</h2>

      {/* Step Navigation */}
      <div>
        <button type="button" disabled={currentStep === 1} onClick={prev}>
          Previous
        </button>
        <button type="button" onClick={next}>
          Next
        </button>
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <section>
          <h3>Step 1: Document Links</h3>
          <div>
            <label>Resume (Google Drive Link):</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    {...register("resumeLink")}
                    placeholder="Google Drive link"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Please provide a Google Drive link to your resume. Make sure
                    the link is accessible to all emails.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {errors.resumeLink && (
              <p>{errors.resumeLink.message?.toString()}</p>
            )}
          </div>
          <div>
            <label>10th Marks:</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    {...register("marks10th", { valueAsNumber: true })}
                    type="number"
                    placeholder="10th Marks (%)"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Enter your total marks or percentage obtained in 10th grade.{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {errors.marks10th && <p>{errors.marks10th.message?.toString()}</p>}
          </div>
          <div>
            <label>12th Marks:</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    {...register("marks12th", { valueAsNumber: true })}
                    type="number"
                    placeholder="12th Marks (%)"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Enter your total marks or percentage obtained in 12th grade.{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {errors.marks12th && <p>{errors.marks12th.message?.toString()}</p>}
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section>
          <h3>Step 2: Proofs and Certifications</h3>
          <div>
            <label>SGPAs with Proofs (Google Drive Link):</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    {...register("sgpaProofs")}
                    placeholder="Google Drive link"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Provide a Google Drive link to a PDF containing all DMCs up
                    to the 6th semester.{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {errors.sgpaProofs && (
              <p>{errors.sgpaProofs.message?.toString()}</p>
            )}
          </div>
          <div>
            <label>Student ID Card (Google Drive Link):</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    {...register("collegeIdCard")}
                    placeholder="Google Drive link"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Upload a PDF of your college ID card and provide the Google
                    Drive link.{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {errors.collegeIdCard && (
              <p>{errors.collegeIdCard.message?.toString()}</p>
            )}
          </div>
          <div>
            <label>Achievement Certificates (Google Drive Link):</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    {...register("achievementCertificates")}
                    placeholder="Google Drive link"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Provide a Google Drive link to a PDF file with your
                    achievements certificates.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {errors.achievementCertificates && (
              <p>{errors.achievementCertificates.message?.toString()}</p>
            )}
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section>
          <h3>Final Review</h3>
          <p>Please review your information and submit.</p>
          <Button type="submit">Submit</Button>
        </section>
      )}
    </form>
  );
};

export default StudentOnboardingForm;
