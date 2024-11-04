"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { ArrowRight, Eye, X } from 'lucide-react';
import React, { useState } from 'react';
import QuillRichTE from "@/components/ui/QuillRichTE";
import LoadingBar from '@/components/LoadingBar';
import CompanyPreviewPage from '@/app/company/previewPage';
import { Combobox } from '@/components/CompanySelectCombobox';
import { DatePicker } from '@/components/ui/date-picker';
import { useForm } from 'react-hook-form';

export const DrivePostPage = () => {

  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const { register, handleSubmit, setValue } = useForm()

  const [formData, setFormData] = useState({
    companyName: "",
    jobLocation: "",
    driveDate: new Date(),
    driveDuration: 1,
    requirements: "",
    pointsToNote: "",
    jdDocLink: ""
  });

  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuillChange = (fieldName: string, value: string) => {
    setValue(fieldName, value)
  };

  const handlePreviewClick = () => {
    console.log(formData);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPreviewing(true);
    }, 1000);
  };

  const onSubmit = (d: any) => {
    console.log(d);
  }


  return (
    <div className='mb-10 overflow-hidden'>

      {
        isLoading ? <LoadingBar /> :
          !isPreviewing ?
            <>
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

                <section className="w-full">
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 mt-4">
                    <div className='w-full flex flex-col gap-1'>
                      <Label htmlFor='companyName' className='text-lg font-bold'>Company Name</Label>
                      <Combobox
                        itemList={[]}
                        className='h-10 w-full'
                        placeholder='Select company'
                        onChange={(value: string) => { setValue("companyName", value) }}
                      />
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='driveDate' className='text-lg font-bold'>Date of the Placement Drive</Label>
                        <DatePicker
                          className='w-full'
                          id="driveDate"
                          onChange={(value: string) => { setValue("driveDate", value) }}
                        />
                      </div>

                      <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='driveDuration' className='text-lg font-bold'>Duration of Placement Drive (Days) </Label>
                        <Input type='number' {...register("driveDuration")} />
                      </div>
                    </div>

                    {/* <div className='flex gap-4'>

                      <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='stipend' className='text-lg font-bold'>Stipend / Month</Label>
                        <Input
                          type='text'
                          placeholder='Ex: 40k, 40-45k'
                          id='stipend'

                          className='h-10'
                        />
                      </div>

                      <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='salary' className='text-lg font-bold'>Salary (Annual CTC)</Label>
                        <Input
                          type='text'
                          placeholder='Ex: 7LPA or 7-8LPA'
                          id='salary'
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className='h-10'
                        />
                      </div>

                    </div> */}

                    <div className='w-full flex flex-col gap-1'>
                      <Label htmlFor='jobLocation' className='text-lg font-bold'>Job Location</Label>
                      <Input
                        type='text'
                        placeholder='Ex: Chandigarh, Delhi, Pune'
                        {...register("location")}
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
                      <Label htmlFor='jdDocuments' className='text-lg font-bold'>Job Descriptions</Label>
                      <p className='text-sm font-medium'>Google Drive Link to Job Discription Documents.</p>
                      <Input
                        type='text'
                        placeholder='Google Drive Link to Job Discription Documents'
                        {...register("jdDocLink")}
                        className='h-10'
                      />
                    </div>

                    <div className='w-full flex flex-col gap-1 mt-8'>
                      <Input type='submit' value="Submit" />
                    </div>
                  </form>

                  <div className='w-full flex justify-end items-center gap-1 mt-6'>
                    <Button
                      variant="default"
                      className='font-bold text-lg'
                      onClick={handlePreviewClick}
                    >
                      <Eye size={22} />
                      <span className='pl-2'>Preview</span>
                    </Button>
                  </div>
                </section>
              </section>
            </>
            : <CompanyPreviewPage formData={formData} jobRoles={jobRoles} setPreview={setIsPreviewing} />
      }

    </div >
  );
};