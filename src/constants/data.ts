import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  id: string;
  overview: string;
  name: string;
  linkedIn: string;
  website: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Students",
    url: "/admin/dashboard/students",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Company",
    url: "#",
    icon: "product",
    isActive: true,
    items: [
      {
        title: "View All Companies",
        url: "/admin/dashboard/company",
        icon: "page",
      },
      {
        title: "Add new Company",
        url: "/admin/dashboard/company/add",
        icon: "userPen",
      },
    ],
  },
  {
    title: "Drive",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "billing",
    isActive: true,
    items: [
      {
        title: "Create Drive",
        url: "/admin/dashboard/drive",
        icon: "userPen",
      },
      {
        title: "Add new Company",
        url: "/admin/dashboard/company/add",
        icon: "login",
      },
    ],
  },
  // {
  //   title: "Manage Users",
  //   url: "/admin/dashboard/company",
  //   icon: "product",
  //   isActive: false,
  //   items: [], // No child items
  // },
];

export const userNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/user/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: "user",
    isActive: true,
    items: [], // No child items
  },
  {
    title: "Drives",
    url: "/user/drive", // Placeholder as there is no direct link for the parent
    icon: "laptop",
    isActive: false,
    items: [],
  },
  {
    title: "View All Companies",
    url: "/user/company",
    icon: "ellipsis",
    items: [],
  },
  // {
  //   title: "Manage Users",
  //   url: "/admin/dashboard/company",
  //   icon: "product",
  //   isActive: false,
  //   items: [], // No child items
  // },
];
