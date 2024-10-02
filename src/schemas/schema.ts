import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long, containing both letters and numbers."
    ).optional(),
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
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long, containing both letters and numbers."
    ),
});
