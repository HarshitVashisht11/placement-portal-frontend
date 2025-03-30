"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Eye, Plus, Trash, X } from "lucide-react";
import React, { useState } from "react";
import QuillRichTE from "@/components/ui/QuillRichTE";
import LoadingBar from "@/components/LoadingBar";
import CompanyPreviewPage from "../../company/_components/company-preview-page";
import { Combobox } from "@/components/CompanySelectCombobox";
import { DatePicker } from "@/components/ui/date-picker";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KanbanBoard } from "./kanban-board";
import { Checkbox } from "@/components/ui/checkbox";
import { Branch } from "@/schemas/types";

const branches = [
  {
    id: Branch.CSE,
  },
  {
    id: Branch.ECE,
  },
  {
    id: Branch.MECH,
  },
  {
    id: Branch.CIVIL,
  },
] as const;

export const DrivePostPage = () => {
  const [jobRoles, setJobRoles] = useState<Role[]>([]);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const router = useRouter();
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [allowedBranches, setAllowedBranches] = useState<string[]>([
    Branch.CSE,
    Branch.ECE,
  ]);

  const handleQuillChange = (fieldName: string, value: string) => {
    setValue(fieldName, value);
  };

  const handlePreviewClick = () => {
    console.log({
            ...getValues(),
            id: Date.now().toString(),
            roles: jobRoles,
          });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPreviewing(true);
    }, 1000);
  };

  const onSubmit = async (d: any) => {
    const requiredData = localStorage.getItem("task-store");
    if (!requiredData) {
      return toast.error("Please add required tasks for the drive");
    }
    const tasks = JSON.parse(requiredData).state.tasks.filter(
      (task: any) => task.status === "required"
    );

    const tasksData = tasks.map((task: any) => {
      return task.id;
    });

    const payload = {
      ...d,
      id: Date.now().toString(),
      roles: jobRoles,
      allowed_branches: allowedBranches.join(","),
      required_data: tasksData.join(","),
      deadline: new Date(d.deadline).toISOString(),
      drive_date: new Date(d.drive_date).toISOString(),
    };

    toast.loading("Adding Drive...");

    try {
      const response = await api.post("/jobs/addNewDrive", payload);
      toast.dismiss();
      if (response.status === 201) {
        toast.success("Drive Posted successfully");
        toast.loading("Redirecting to dashboard...");
        setTimeout(() => {
          toast.dismiss();
          router.push("/admin/dashboard/overview");
        }, 2000);
      }
    } catch (error) {
      console.error("error posting drive:", error);
      toast.dismiss();
      toast.error("Failed to post Drive");
    }
  };

  const [currentRole, setCurrentRole] = useState<Role>({
    id: "",
    drive_id: "",
    title: "",
    stipend_low: 0,
    stipend_high: 0,
    salary_low: 0,
    salary_high: 0,
  });

  const handleAddRole = () => {
    if (currentRole.title != "") {
      setJobRoles([
        ...jobRoles,
        {
          ...currentRole,
          id: Date.now().toString(),
        },
      ]);
      setCurrentRole({
        id: "",
        drive_id: "",
        title: "",
        stipend_low: 0,
        stipend_high: 0,
        salary_low: 0,
        salary_high: 0,
      });
    }
  };

  const handleRoleInfoChange = (e: any) => {
    const { id, value } = e.target;

    if (id != "title") {
      setCurrentRole((prevData: any) => ({
        ...prevData,
        [id]: parseInt(value),
      }));
    } else {
      setCurrentRole((prevData: any) => ({
        ...prevData,
        [id]: value as string,
      }));
    }
  };

  const handleDeleteRole = (id: string) => {
    setJobRoles(jobRoles.filter((role) => role.id !== id));
  };

  return (
    <div className="mb-10 overflow-hidden">
      {isLoading ? (
        <LoadingBar />
      ) : !isPreviewing ? (
        <>
          <section className="bg-gray-200 min-h-28 px-4 py-2 flex justify-between branches-end rounded-lg">
            <div className="flex branches-center">
              <div>
                <h1 className="text-4xl font-black">Post a New Opportunity</h1>
                <div className="text-md mt-1 text-gray-600 font-regular">
                  <span>Placement Opportunity Setup Wizard</span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex mt-4 gap-x-2">
            <section className="w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4 mt-4"
              >
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="companyName" className="text-lg font-bold">
                    Company Name
                  </Label>
                  <Combobox
                    itemList={[]}
                    className="h-10 w-full"
                    placeholder="Select company"
                    onChange={(value: string) => {
                      setValue("company_id", value);
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="driveDate" className="text-lg font-bold">
                      Date of the Placement Drive
                    </Label>
                    <DatePicker
                      className="w-full"
                      id="driveDate"
                      onChange={(value: string) => {
                        setValue("drive_date", value);
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="driveDate" className="text-lg font-bold">
                      Last Date to Apply
                    </Label>
                    <Input
                      onChange={(e) => {
                        let date = new Date(e.target.value);

                        // Convert to IST: add 5 hours and 30 minutes
                        date.setHours(date.getHours() + 5);
                        date.setMinutes(date.getMinutes() + 30);
                        setValue("deadline", date.toISOString());
                      }}
                      type="datetime-local"
                      className="w-full"
                      id="deadline"
                      // {...register("deadline")}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-1">
                    <Label
                      htmlFor="driveDuration"
                      className="text-lg font-bold"
                    >
                      Duration of Placement Drive (Days){" "}
                    </Label>
                    <Input
                      placeholder="Enter the number of days drive will last"
                      type="number"
                      onChange={(e) => {
                        setValue("drive_duration", parseInt(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="jobLocation" className="text-lg font-bold">
                      Job Location
                    </Label>
                    <Input
                      type="text"
                      placeholder="Ex: Chandigarh, Delhi, Pune"
                      {...register("location")}
                      className="h-10"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="min_cgpa" className="text-lg font-bold">
                      CGPA Requirement
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter minimum CGPA required by the company."
                      onChange={(e) => {
                        setValue("min_cgpa", parseFloat(e.target.value));
                      }}
                      className="h-10"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="drive_type" className="text-lg font-bold">
                      Drive Location
                    </Label>
                    <Select
                      onValueChange={(e) => {
                        setValue("drive_type", e);
                      }}
                    >
                      <SelectTrigger className="w-full h-full">
                        <SelectValue placeholder="Drive Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-campus">On Campus</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="company-office">
                          Company Office
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <h1 className="text-lg font-bold">Roles Offered</h1>
                    <Label
                      htmlFor="jobLocation"
                      className="text-sm font-medium"
                    >
                      Role Title
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      placeholder="Role title"
                      className="h-10"
                      value={currentRole.title}
                      onChange={(e) => {
                        handleRoleInfoChange(e);
                      }}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-full flex flex-col gap-1">
                      <Label
                        htmlFor="jobLocation"
                        className="text-sm font-medium"
                      >
                        Stipend Low
                      </Label>
                      <Input
                        type="number"
                        placeholder="15000"
                        className="h-10"
                        id="stipend_low"
                        value={currentRole.stipend_low}
                        onChange={(e) => {
                          handleRoleInfoChange(e);
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <Label
                        htmlFor="jobLocation"
                        className="text-sm font-medium"
                      >
                        Stipend High
                      </Label>
                      <Input
                        type="number"
                        placeholder="20000"
                        className="h-10"
                        id="stipend_high"
                        value={currentRole.stipend_high}
                        onChange={(e) => {
                          handleRoleInfoChange(e);
                        }}
                      />
                    </div>

                    <div className="w-full flex flex-col gap-1">
                      <Label
                        htmlFor="jobLocation"
                        className="text-sm font-medium"
                      >
                        Salary Low
                      </Label>
                      <Input
                        type="number"
                        placeholder="40000"
                        className="h-10"
                        id="salary_low"
                        value={currentRole.salary_low}
                        onChange={(e) => {
                          handleRoleInfoChange(e);
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <Label
                        htmlFor="jobLocation"
                        className="text-sm font-medium"
                      >
                        Salary High
                      </Label>
                      <Input
                        type="number"
                        placeholder="50000"
                        className="h-10"
                        id="salary_high"
                        value={currentRole.salary_high}
                        onChange={(e) => {
                          handleRoleInfoChange(e);
                        }}
                      />
                    </div>
                    <div className="w-full flex branches-end justify-end mt-2">
                      <Button
                        type="button"
                        onClick={() => {
                          handleAddRole();
                        }}
                        className="flex w-full h-10 branches-center justify-center gap-2"
                      >
                        <Plus strokeWidth={4} size={16} />
                        <span> Add this role</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <table className="min-w-full mt-4 border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 border-b">Role Title</th>
                          <th className="px-4 py-2 border-b">Stipend Low</th>
                          <th className="px-4 py-2 border-b">Stipend High</th>
                          <th className="px-4 py-2 border-b">Salary Low</th>
                          <th className="px-4 py-2 border-b">Salary High</th>
                          <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobRoles.length > 0 ? (
                          jobRoles.map((role) => (
                            <tr key={role.id}>
                              <td className="px-4 py-2 text-center">
                                {role.title}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {role.stipend_low}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {role.stipend_high}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {role.salary_low}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {role.salary_high}
                              </td>
                              <td className="px-4 py-2 text-center flex gap-2 justify-center">
                                <Button
                                  variant={"ghost"}
                                  onClick={() => handleDeleteRole(role.id)}
                                  className="text-red-500"
                                >
                                  <Trash size={16} strokeWidth={3} />
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-4 py-2 text-center border-b"
                            >
                              {" "}
                              No Roles added yet!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="requirements" className="text-lg font-bold">
                    Requirements
                  </Label>
                  <p className="text-sm font-medium">
                    Mention job role requirements for each role below.
                  </p>
                  <QuillRichTE
                    id="requirements"
                    onChange={(value: string) =>
                      handleQuillChange("qualifications", value)
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-1 mt-8">
                  <Label htmlFor="pointsToNote" className="text-lg font-bold">
                    Points to Note
                  </Label>
                  <p className="text-sm font-medium">
                    Important points to note regarding the job opportunity.
                  </p>
                  <QuillRichTE
                    id="pointsToNote"
                    onChange={(value: string) =>
                      handleQuillChange("points_to_note", value)
                    }
                  />
                </div>
                <div className="w-full flex flex-col gap-1 mt-8">
                  <Label htmlFor="jdDocuments" className="text-lg font-bold">
                    Job Descriptions
                  </Label>
                  <p className="text-sm font-medium">
                    Google Drive Link to Job Discription Documents.
                  </p>
                  <Input
                    type="text"
                    placeholder="Google Drive Link to Job Discription Documents"
                    {...register("job_description")}
                    className="h-10"
                  />
                </div>
                <div className="w-full flex flex-col gap-1 mb-2">
                  <Label htmlFor="branches" className="text-lg font-bold">
                    Allowed Branches
                  </Label>
                  {branches.map((item) => {
                    return (
                      <div className="flex justify-start items-center gap-x-2">
                        <Checkbox
                          value={item.id}
                          checked={
                            allowedBranches &&
                            allowedBranches.length > 0 &&
                            allowedBranches.includes(item.id)
                          }
                          onCheckedChange={() => {
                            if (
                              allowedBranches &&
                              allowedBranches.length > 0 &&
                              allowedBranches.includes(item.id)
                            ) {
                              const branches = allowedBranches.filter(
                                (branch) => branch !== item.id
                              );
                              setAllowedBranches(branches);
                              return;
                            }
                            const branches = [...allowedBranches];
                            branches.push(item.id);
                            setAllowedBranches(branches);
                          }}
                        />
                        <span>{item.id}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4 my-2">
                  <Label htmlFor="student_data" className="text-lg font-bold">
                    Data Required From Student
                    <p className="text-sm font-medium">
                      *This can be changed later on view drive page.
                    </p>
                  </Label>
                  <div className="flex justify-center items-center">
                    <KanbanBoard />
                  </div>
                </div>
                <Separator className="my-4" />

                <div className="w-full flex flex-col gap-1 mt-8">
                  <Input type="submit" value="Submit" />
                </div>
              </form>

              <div className="w-full flex justify-end items-center gap-1 mt-6">
                <Button
                  variant="default"
                  className="font-bold text-lg"
                  onClick={handlePreviewClick}
                >
                  <Eye size={22} />
                  <span className="pl-2">Preview</span>
                </Button>
              </div>
            </section>

            <aside className="w-1/4 p-4 md:block hidden">
              <h1 className="font-black text-lg">Checklist</h1>
              <ul className="mt-2 ml-2">
                {[
                  "Company Name",
                  "Stipend & Salary",
                  "Job Location",
                  "Key Requirements",
                  "Points To Note",
                  "Job Descriptions",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center pb-2 justify-start"
                  >
                    <ArrowRight size={12} />
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="ml-1 underline-offset-2 hover:underline transition-all duration-700"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </>
      ) : (
        <CompanyPreviewPage
          driveDataForPreview={{
            ...getValues(),
            id: Date.now().toString(),
            roles: jobRoles,
          }}
          setPreview={setIsPreviewing}
          onPublish={onSubmit}
          onFormSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
