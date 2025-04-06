"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Download,
  ArrowRight,
  MapPin,
  Banknote,
  Calendar,
  Milestone,
  ChevronDown,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { api, auth_api } from "@/lib/api";
import toast from "react-hot-toast";

const attributes = [
  { key: "name", label: "Name" },
  { key: "phone_number", label: "Phone Number" },
  { key: "email", label: "Email" },
  { key: "gender", label: "Gender" },
  { key: "branch", label: "Branch" },
  { key: "rollnum", label: "Roll Number" },
  { key: "year_of_admission", label: "Year of Admission" },
  { key: "has_backlogs", label: "Any Backlogs" },
  { key: "sgpasem1", label: "SGPA Semester 1" },
  { key: "sgpasem2", label: "SGPA Semester 2" },
  { key: "sgpasem3", label: "SGPA Semester 3" },
  { key: "sgpasem4", label: "SGPA Semester 4" },
  { key: "sgpasem5", label: "SGPA Semester 5" },
  { key: "sgpasem6", label: "SGPA Semester 6" },
  { key: "cgpa", label: "CGPA" },
  { key: "marks10th", label: "Marks (10th)" },
  { key: "marks12th", label: "Marks (12th)" },
  { key: "sgpa_proofs", label: "SGPA Proofs" },
  { key: "achievement_certificates", label: "Achievement Certificates" },
  { key: "college_id_card", label: "College ID Card" },
  { key: "resume", label: "Resume" },
];

const AdminViewDrivePage = ({ driveData }: { driveData: DriveView }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const downloadAppliedStudentList = async (roleId: string) => {
    // auth_api
    //   .get(`/admin/drive/${driveData.id}/applied-students/${roleId}`)
    //   .then((res) => {
    //     const data = res.data;
    //     const csv = data.map((row: any) =>
    //       attributes.map((attr) => row[attr.key]).join(",")
    //     );
    //     csv.unshift(attributes.map((attr) => attr.label).join(","));
    //     const csvContent = csv.join("\n");
    //     const blob = new Blob([csvContent], { type: "text/csv" });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = `${driveData.company.name}_drive_student_list.csv`;
    //     a.click();
    //     URL.revokeObjectURL(url);
    //   })
    //   .catch((err) => {
    //     toast.error("Failed to download the file");
    //   });
    console.log(
      "Downloading Applied Student List for Role: ",
      roleId,
      driveData.id
    );

    try {
      const response = await api.post(
        "/jobs/drive/applicant",
        {
          required_data: driveData.required_data,
        },
        {
          params: {
            rid: roleId,
            did: driveData.id,
          },
          responseType: "blob",
        }
      );

      // Create a link element to trigger the file download
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      const filename = driveData.company.name + "_" + driveData.roles.find((role) => role.id === roleId )?.title + "_applicants.csv";

      link.setAttribute("download",
                       filename); // Set the filename for download
      document.body.appendChild(link);
      link.click(); // Simulate click to download the file
      document.body.removeChild(link); // Clean up after download
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  useEffect(() => {
    if (driveData.applied_role.id) {
      setIsApplied(true);
      setSelectedRoleId(driveData.applied_role.id);
    }
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-t pb-3 from-slate-200 to-white min-h-32 px-4 py-2 flex justify-between items-end rounded-lg">
        <div className="flex flex-col pt-12 gap-6 items-start justify-between">
          {/* <img src="/path/to/logo.png" alt="Company Logo" className="h-10 mr-2" /> */}
          <div className="space-y-2">
            <h1 className="text-4xl font-black">{driveData.company.name}</h1>
            <div className="text-lg text-gray-600 font-regular">
              <span className="capitalize font-semibold">
                {driveData.roles.length > 1
                  ? "Multiple Roles"
                  : driveData.roles[0].title}
              </span>{" "}
              |{" "}
              <span className="capitalize font-semibold">
                {driveData.drive_type} Drive
              </span>
            </div>
          </div>
        </div>
        <div className="h-full flex gap-2 items-end justify-end">
          <div className="mr-2">
            <span className="text-lg text-gray-600">Apply By: </span>
            <span className="text-lg font-semibold text-gray-800">
              {new Date(driveData.deadline).toUTCString().slice(0, 22) + " IST"}
            </span>
          </div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button className="space-x-2">
                <span>Applied Student List</span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full">
              <DropdownMenuLabel>Download for Role</DropdownMenuLabel>
              {driveData.roles.map((role: Role) => (
                <DropdownMenuItem
                  onClick={() => {
                    downloadAppliedStudentList(role.id);
                  }}
                >
                  {role.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button className="bg-green-500 text-black hover:bg-green-600 hover:text-white">
            <a
              href={driveData.job_description}
              target="_blank"
              rel="noreferrer noopener"
              download={driveData.company.name + "_drive_student_list.csv"}
              className="flex gap-2 items-center justify-center"
            >
              <span>Applied Student List</span>
              <Download size={15} strokeWidth={3} />
            </a>
          </Button> */}
          <Button>
            <a
              href={driveData.job_description}
              target="_blank"
              rel="noreferrer noopener"
              download={"JD_" + driveData.company.name + "_drive.pdf"}
              className="flex gap-2 items-center justify-center"
            >
              <span>Job Description</span>
              <Download size={15} strokeWidth={3} />
            </a>
          </Button>
        </div>
      </section>

      <section className="flex mt-4">
        <section className="flex-1 py-4 ml-4">
          <article className="flex flex-row items-center justify-around gap-4 bg-gray-200 rounded-lg p-2">
            <div className="flex flex-col w-1/5 items-start justify-center py-4 px-2">
              <div className="flex items-center justify-center gap-2">
                <Banknote size={18} color="gray" />{" "}
                <span className="text-md font- text-gray-600">
                  CTC Highest (Annual)
                </span>
              </div>
              <span className="text-xl font-bold">
                {
                  driveData.roles.sort(
                    (a: Role, b: Role) => b.salary_high - a.salary_high
                  )[0].salary_high
                }{" "}
                LPA
              </span>
            </div>
            <div className="h-5 border border-gray-400 rounded-full"></div>
            <div className="flex flex-col w-1/5 items-start justify-center py-4 px-2">
              <div className="flex items-center justify-center gap-2">
                <Calendar size={16} color="gray" />{" "}
                <span className="text-md font-medium text-gray-600">
                  Date of Drive
                </span>
              </div>
              <span className="text-xl font-bold">
                {new Date(driveData.drive_date).toDateString()}
              </span>
            </div>

            <div className="h-5 border border-gray-400 rounded-full"></div>
            <div className="flex flex-col w-1/5 items-start justify-center py-4 px-2">
              <div className="flex items-center justify-center gap-2">
                <Milestone size={16} color="gray" />{" "}
                <span className="text-md font-medium text-gray-600">
                  Minimum CPGA
                </span>
              </div>
              <span className="text-xl font-bold">{driveData.min_cgpa}</span>
            </div>

            <div className="h-5 border border-gray-400 rounded-full"></div>
            <div className="flex flex-col w-1/5 items-start justify-center py-4 px-2">
              <div className="flex items-center justify-center gap-2">
                <MapPin size={16} color="gray" />{" "}
                <span className="text-md font-medium text-gray-600">
                  Job Location
                </span>
              </div>
              <span className="text-xl font-bold">{driveData.location}</span>
            </div>
          </article>
          <article className="mt-4 w-full flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-gray-700" id="overview">
                Overview
              </h2>
              <p className="text-justify text-gray-600 font-regular">
                {driveData.company ? driveData.company.overview : ""}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-gray-700" id="roles">
                Job Roles Offered
              </h2>
              <table className="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Role Title</th>
                    <th className="px-4 py-2 border-b">Stipend</th>
                    <th className="px-4 py-2 border-b">Salary(LPA)</th>
                  </tr>
                </thead>
                <tbody>
                  {driveData.roles.map((role: any) => {
                    const salary =
                      role.salary_low === 0 && role.salary_high === 0
                        ? "N.A."
                        : role.salary_low === role.salary_high
                        ? role.salary_high
                        : role.salary_low === 0
                        ? role.salary_high
                        : `${role.salary_low} - ${role.salary_high}`;
                    const stipend =
                      role.stipend_low === 0 && role.stipend_high === 0
                        ? "N.A."
                        : role.stipend_low === role.stipend_high
                        ? role.stipend_high
                        : role.stipend_low === 0
                        ? role.stipend_high
                        : `${role.stipend_low} - ${role.stipend_high}`;

                    return role.id == selectedRoleId ? (
                      <tr key={role.id}>
                        <td className="px-4 py-2 text-center">{role.title}</td>
                        <td className="px-4 py-2 text-center">{stipend}</td>
                        <td className="px-4 py-2 text-center">{salary}</td>
                      </tr>
                    ) : (
                      <tr
                        key={role.id}
                        className={`${
                          isApplied ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <td className="px-4 py-2 text-center">{role.title}</td>
                        <td className="px-4 py-2 text-center">{stipend}</td>
                        <td className="px-4 py-2 text-center">{salary}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-gray-700" id="responsibilites">
                Allowed Branches
              </h2>
              <ul>
                {driveData.allowed_branches.map((branch: any) => (
                  <li>{branch}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-gray-700" id="responsibilites">
                Qualifications
              </h2>
              <div
                className="text-justify text-gray-600 font-regular"
                dangerouslySetInnerHTML={{
                  __html: driveData.qualifications,
                }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-gray-700" id="pointsToNote">
                Points To Note
              </h2>
              <div
                className="text-justify text-gray-600 font-regular"
                dangerouslySetInnerHTML={{
                  __html: driveData.points_to_note,
                }}
              ></div>
            </div>
            <Separator />
            <p className="italic">
              * Please read about the company in detail and Job Description
              carefully. Only those students who are genuinely interested in
              this opportunity and are willing to join should fill. We will not
              entertain any last minute drop out cases.
            </p>
          </article>
        </section>
        <aside className="w-1/6 p-4">
          <h1 className="font-black text-lg">Navigate</h1>

          <ul className="mt-2 ml-2">
            <li className="flex items-center pb-2 justify-start">
              <ArrowRight size={12} />
              <a
                href="#overview"
                className="ml-1 underline-offset-2 hover:underline transition-all duration-700"
              >
                Overview
              </a>
            </li>
            <li className="flex items-center pb-2 justify-start">
              <ArrowRight size={12} />
              <a
                href="#roles"
                className=" ml-1 underline-offset-2 hover:underline transition-all duration-700"
              >
                Job Titles
              </a>
            </li>
            <li className="flex items-center pb-2 justify-start">
              <ArrowRight size={12} />
              <a
                href="#responsibilites"
                className="ml-1 underline-offset-2 hover:underline transition-all duration-700"
              >
                Qualifications
              </a>
            </li>
            <li className="flex items-center pb-2 justify-start">
              <ArrowRight size={12} />
              <a
                href="#pointsToNote"
                className="ml-1 underline-offset-2 hover:underline transition-all duration-700"
              >
                Points To Note
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default AdminViewDrivePage;
