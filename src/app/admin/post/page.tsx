"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { ArrowRight, X } from 'lucide-react';
import React, { useState } from 'react';
import QuillRichTE from "@/components/ui/QuillRichTE";

const Page = () => {
    const [jobRoles, setJobRoles] = useState<string[]>([]);
    const [currentJobRole, setCurrentJobRole] = useState<string>("");
    const [formData, setFormData] = useState({
        companyName: "",
        stipend: "",
        salary: "",
        jobLocation: "",
        requirements: "",
        pointsToNote: "",
    });

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleQuillChange = (fieldName: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleAddJobRole = () => {
        if (currentJobRole != "") {
            setJobRoles([...jobRoles, currentJobRole]);
            setCurrentJobRole("");
        }
    };

    return (
        <div className='mb-10 overflow-hidden'>
            <section className="bg-gray-200 min-h-28 px-4 py-2 flex justify-between items-end rounded-lg">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-4xl font-black">Post a New Opportunity</h1>
                        <div className='text-md mt-1 text-gray-600 font-regular'>
                            <span>Placement Opportunity Setup Wizard</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex mt-4">
                <aside className="w-1/4 p-4">
                    <h1 className="font-black text-lg">Checklist</h1>
                    <ul className="mt-2 ml-2">
                        {["Company Name", "Stipend & Salary", "Job Location", "Key Requirements", "Points To Note", "Job Descriptions"].map((item, index) => (
                            <li key={index} className='flex items-center pb-2 justify-start'>
                                <ArrowRight size={12} />
                                <a href={`#${item.toLowerCase().replace(/\s+/g, '')}`} className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>{item}</a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <section className="w-full flex flex-col gap-4 mt-4">
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='companyName' className='text-lg font-bold'>Company Name</Label>
                        <Input
                            type='text'
                            placeholder='Ex: Amazon, Microsoft, Google'
                            id='companyName'
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className='h-10'
                        />
                    </div>

                    <div className='flex gap-4'>
                        <div className='w-full flex flex-col gap-1'>
                            <Label htmlFor='stipend' className='text-lg font-bold'>Stipend / Month</Label>
                            <Input
                                type='text'
                                placeholder='Ex: 40k, 40-45k'
                                id='stipend'
                                value={formData.stipend}
                                onChange={handleInputChange}
                                className='h-10'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-1'>
                            <Label htmlFor='salary' className='text-lg font-bold'>Salary (Annual CTC)</Label>
                            <Input
                                type='text'
                                placeholder='Ex: 7LPA or 7-8LPA'
                                id='salary'
                                value={formData.salary}
                                onChange={handleInputChange}
                                className='h-10'
                            />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='jobRoles' className='text-lg font-bold'>Job Roles Offered</Label>
                        <div className='flex gap-2'>
                            <Input
                                type='text'
                                placeholder='Ex: Associate Software Engineer, SDE, BA'
                                value={currentJobRole}
                                onChange={(e) => setCurrentJobRole(e.target.value)}
                                id='jobRoles'
                                className='h-10'
                            />
                            <Button variant="default" onClick={handleAddJobRole}>Add</Button>
                        </div>
                        <div className='flex items-center w-full'>
                            <span className='flex items-center font-bold mt-1'>Selected: </span>
                            <div className='flex items-center gap-1 ml-4'>
                                {jobRoles.map((role, index) => (
                                    <div key={index} className='flex items-center justify-between gap-2 bg-blue-200 text-sm rounded-full px-2 py-1'>
                                        <span>{role}</span>
                                        <div className='p-1 flex items-center justify-center aspect-square rounded-full hover:bg-red-500 cursor-pointer' onClick={() => setJobRoles(jobRoles.filter((_, i) => i !== index))}>
                                            <X size={12} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='jobLocation' className='text-lg font-bold'>Job Location</Label>
                        <Input
                            type='text'
                            placeholder='Ex: Chandigarh, Delhi, Pune'
                            id='jobLocation'
                            value={formData.jobLocation}
                            onChange={handleInputChange}
                            className='h-10'
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='requirements' className='text-lg font-bold'>Requirements</Label>
                        <p className='text-sm font-medium'>Mention job role requirements for each role below.</p>
                        <QuillRichTE
                            id="requirements"
                            value={formData.requirements}
                            onChange={(value: string) => handleQuillChange("requirements", value)}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1 mt-8'>
                        <Label htmlFor='pointsToNote' className='text-lg font-bold'>Points to Note</Label>
                        <p className='text-sm font-medium'>Important points to note regarding the job opportunity.</p>
                        <QuillRichTE
                            id="pointsToNote"
                            value={formData.pointsToNote}
                            onChange={(value: string) => handleQuillChange("pointsToNote", value)}
                        />
                    </div>

                    <div className='w-full flex flex-col gap-1 mt-8'>
                        <Label htmlFor='jdDocuments' className='text-lg font-bold'>Upload Job Description</Label>
                        <p className='text-sm font-medium'>Upload JDs for all the job roles here.</p>
                        <Input type='file' id='jdDocuments' className='h-10 items-center justify-start cursor-pointer' multiple />
                    </div>

                    <div className='w-full flex flex-col gap-1 mt-8'>
                        <Button variant="ghost" className='bg-black text-white font-bold text-lg' onClick={() => {
                            console.log(formData);
                        }}>Post Job Opportunity</Button>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Page;
