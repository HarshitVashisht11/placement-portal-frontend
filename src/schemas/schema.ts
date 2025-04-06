import * as z from "zod";

const googleDriveLinkRegex = /^(https:\/\/)?(drive\.google\.com)/;

export const StudentOnboardingSchema = z.object({
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
  sgpasem1: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpasem2: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpasem3: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpasem4: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpasem5: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  sgpasem6: z.coerce
    .number()
    .min(1, "Please enter a valid SGPA")
    .max(10, "Maximum allowed is 10")
    .optional(),
  cgpa: z.coerce
    .number()
    .min(1, "Please enter a valid CGPA")
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

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  phone_number: z
    .string()
    .min(10, "Phone number must be 10 digits.")
    .max(10, "Phone number must be 10 digits.")
    .regex(/^\d{10}$/, "Please Enter a Valid Phone Number.")
    .optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
  email: z.string().email("Invalid email address").optional(),
  rollnum: z
    .string()
    .regex(/^\d[1-9][3512]\d{2}$/, "Please Enter a Valid Roll Number."),
  fullrollnum: z.string().optional(),
  year_of_admission: z
    .number()
    .min(1900, "Invalid year of admission")
    .max(new Date().getFullYear(), "Year of admission cannot be in the future")
    .optional(),
  student_type: z.enum(["Regular", "PU MEET", "LEET"]),
  branch: z
    .enum([
      "Computer Science and Engineering",
      "Electronics and Communications Engineering",
      "Civil Engineering",
      "Mechanical Engineering",
    ])
    .optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  otp: z
    .string()
    .regex(/^\d{6}$/, "Please Enter a Valid OTP.")
    .optional(),
});
