import { Banknote, BriefcaseBusiness, Calendar, MapPin } from 'lucide-react'
import React from 'react'

const JobListing = ({ companyName, location, experience, salary, isNew, driveDate }: {
    companyName: string;
    location: string;
    experience: string;
    salary: string;
    isNew: boolean;
    driveDate: Date;
}) => {
    return (
        <div className={`bg-white p-4 rounded-[1rem] border flex justify-between items-start w-full ${isNew ? "border-blue-500 border-2" : ""}`}>
            <div>
                <h2 className="text-2xl font-black">{companyName}</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{location}</span>
                </div>

                <div className="flex items-center gap-6 mt-4 text-gray-500">
                    <div className="flex items-center gap-1">
                        <MapPin size={20} /><span>{location}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <BriefcaseBusiness size={20} /> <span>{experience}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Banknote size={20} /> <span>₹ {salary}</span>
                    </div>
                </div>
            </div>
            <div className='h-full aspect-video rounded-lg flex flex-col items-center justify-center '>
                <span className='text-sm mb-1'>Placement Drive Date</span>
                <span className='text-xl font-bold'>
                    {driveDate.getDate()}.
                    {driveDate.getMonth()}.
                    {driveDate.getFullYear()}
                </span>
            </div>
        </div>
    );
};


export default JobListing
