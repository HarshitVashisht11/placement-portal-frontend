type User = {
  id: string;
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
  role: "STUDENT";
  gender: "MALE" | "FEMALE";
  isOnboarded: boolean;
};

type Company = {
  id: string;
  name: string;
  hrName: string;
  overview: string;
  contactEmail: string;
  contactNumber: string;
  linkedIn?: string;
  website?: string;
};

type Role = {
  id: string;
  drive_id: string;
  title: string;
  stipend_low: number;
  stipend_high: number;
  salary_low: number;
  salary_high: number;
};

type Drive = {
  id: string;
  company_id: string;
  name: string;
  drive_date: Date;
  drive_duration: string;
  roles: Role[];
  deadline: Date;
  location: string;
  qualifications: string;
  points_to_note: string;
  job_description: string;
  min_cgpa: number;
};
