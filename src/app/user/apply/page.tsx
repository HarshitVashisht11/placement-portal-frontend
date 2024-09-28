import { Button } from '@/components/ui/button'
import QuillRichTE from '@/components/ui/QuillRichTE'
import { Label } from '@radix-ui/react-label'
import { ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const ApplyForm = () => {
    return (
        <div className='mb-10 overflow-hidden'>
            <section className="bg-gray-200 min-h-28 px-4 py-2 flex justify-between items-end rounded-lg">
                <div className="flex items-center">
                    {/* <img src="/path/to/logo.png" alt="Company Logo" className="h-10 mr-2" /> */}
                    <div>
                        <h1 className="text-4xl font-black">Post a New Opportunity</h1>
                        <div className='text-md mt-1 text-gray-600 font-regular'>
                            <span>Placement Opportunity Set up Wizard</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex mt-4">
                <aside className="w-1/4 p-4">
                    <h1 className="font-black text-lg">Checklist</h1>
                    <ul className="mt-2 ml-2">

                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#jobLocation" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Job Location</a>
                        </li>
                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#jobLocation" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Job Roles</a>
                        </li>
                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#uploadResume" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Upload Resume</a>
                        </li>
                    </ul>
                </aside>

                <section className="w-full flex flex-col gap-4 mt-4">
                    {/* Name */}
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='studentName' className='text-lg font-bold'>Student Name</Label>
                        <Input type='text' placeholder={"Kanishk Nagpal"} id='studentName' className='h-10' disabled />
                    </div>

                    <div className='flex gap-4'>
                        {/* 10th Class Percentage */}
                        <div className='w-full flex flex-col gap-1'>
                            <Label htmlFor='tenthMarks' className='text-lg font-bold'>10th Class Percentage</Label>
                            <Input type='text' placeholder='Ex: 98, 98.4' id='tenthMarks' className='h-10' disabled />
                        </div>

                        {/* 12th Class Percentage */}
                        <div className='w-full flex flex-col gap-1'>
                            <Label htmlFor='twelthMarks' className='text-lg font-bold'>12th Class Percentage</Label>
                            <Input type='text' placeholder='Ex: 98, 98.4' id='twelthMarks' className='h-10' disabled />
                        </div>
                    </div>

                    {/* Job locatuon */}
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='jobLocation' className='text-lg font-bold'>Job Location</Label>
                        <Input type='text' placeholder='Ex: Chandigarh, Delhi, Pune' id='jobLocation' className='h-10' />
                    </div>

                    {/* Job locatuon */}
                    <div className='w-full flex flex-col gap-1'>
                        <Label htmlFor='jobRole' className='text-lg font-bold'>Job Role</Label>
                        <RadioGroup defaultValue="option-one" id='jobRole'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">Option Two</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* JDs */}
                    <div className='w-full flex flex-col gap-1 mt-2'>
                        <Label htmlFor='uploadResume' className='text-lg font-bold'>Upload Resume</Label>
                        <p className='text-sm font-medium'>Upload your latest resume in PDF format.</p>
                        <Input type='file' id='uploadResume' className='h-10 items-center justify-start cursor-pointer' />
                    </div>

                    <div className='w-full flex flex-col gap-1 mt-8'>
                        <Button variant={"ghost"} className='bg-black text-white font-bold text-lg'>Apply</Button>
                    </div>
                </section>
            </section>
        </div >
    )
}

export default ApplyForm
