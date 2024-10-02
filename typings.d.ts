type User = {
  name: string;
  email: string;
  password: string;
  rollnum: string;
  year_of_admission: number;
  branch:
    | "Computer Science and Engineering"
    | "Electronics and Communication Engineering"
    | "Civil Engineering"
    | "Mechanical Engineering";
  student_type: "Regular" | "PU Meet" | "Leet";
  is_verified: boolean;
  verification_token: string | null;
};
