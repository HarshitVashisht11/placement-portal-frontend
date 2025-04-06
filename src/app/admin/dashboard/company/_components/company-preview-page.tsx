import { ArrowLeft, Download, ArrowRight, MapPin, Banknote, Calendar, Upload, CornerRightUpIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';


const CompanyPreviewPage = ({
  driveDataForPreview, onPublish, setPreview, onFormSubmit
}: {
  driveDataForPreview: any;
  onPublish: any;
  setPreview: any;
  onFormSubmit: any;
}
) => {
  const [companyData, setCompanyData] = useState<any>(undefined)
  useEffect(() => {
    driveDataForPreview.roles.sort((a:any, b:any) => b.salary_high - a.salary_high);
    const getCompanyData = async () => {
      const response = await api.get(`/getCompanyFromID?id=${driveDataForPreview.company_id}`);
      if (response.status == 201) {
        console.log(response.status);
        console.log(response.data.Data);
        setCompanyData(response.data.Data)
      }
    }
    getCompanyData()
  }, []);

  const handlePreviewClick = () => {
    console.log(driveDataForPreview);
    setPreview(false)
  };

  return (
    <div>
      <section className="bg-gray-200 min-h-28 px-4 py-2 flex justify-between items-end rounded-lg">
        <div className="flex flex-col gap-6 items-start justify-between">
          {/* <img src="/path/to/logo.png" alt="Company Logo" className="h-10 mr-2" /> */}
          <Button onClick={handlePreviewClick} className='mt-1'>
            <ArrowLeft size={16} />
            <span className='pl-2'>Back</span>
          </Button>
          <div>
            <h1 className="text-4xl font-black">{companyData?.name} (Preview)</h1>
            <div className='text-md text-gray-600 font-regular'>
              <span>{driveDataForPreview.roles.length > 1 ? "Miltiple Roles (" + driveDataForPreview.roles.length.toString() + ")" : driveDataForPreview.roles[0].title}</span> | <span>{driveDataForPreview.roles[0].salary_high}</span>
            </div>
          </div>
        </div>
        <div className='h-full border flex gap-2 items-end justify-end'>
          <Button disabled>
            <span className='flex gap-2 items-center justify-center'>
              <span>Job Description</span><Download size={15} strokeWidth={3} />
            </span>
          </Button>
          <Button disabled>Apply</Button>
        </div>
      </section>

      <section className="flex mt-4">
        <section className="flex-1 py-4 ml-4">
          <article className='flex flex-row items-center justify-around gap-4 bg-gray-200 rounded-lg'>
            <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
              <div className='flex items-center justify-center gap-2'>
                <MapPin size={16} color='gray' /> <span className='text-md font-medium text-gray-600'>Location</span>
              </div>
              <span className='text-xl font-bold'>{driveDataForPreview.location}</span>
            </div>

            <div className='h-5 border border-gray-400 rounded-full'></div>
            <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
              <div className='flex items-center justify-center gap-2'>
                <Banknote size={18} color='gray' /> <span className='text-md font- text-gray-600'>CTC Highest (Annual)</span>
              </div>
              <span className='text-xl font-bold'>{driveDataForPreview.roles.sort((a: Role, b: Role) => b.salary_high - a.salary_high)[0].salary_high} LPA</span>
            </div>
            <div className='h-5 border border-gray-400 rounded-full'></div>
            <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
              <div className='flex items-center justify-center gap-2'>
                <Calendar size={16} color='gray' /> <span className='text-md font-medium text-gray-600'>Date of Drive</span>
              </div>
              <span className='text-xl font-bold'>{driveDataForPreview.drive_date.getDate().toString() + "/" + driveDataForPreview.drive_date.getMonth().toString() + "/" + driveDataForPreview.drive_date.getFullYear().toString()}</span>
            </div>

            <div className='h-5 border border-gray-400 rounded-full'></div>
            <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
              <div className='flex items-center justify-center gap-2'>
                <Calendar size={16} color='gray' /> <span className='text-md font-medium text-gray-600'>Duration (Days)</span>
              </div>
              <span className='text-xl font-bold'>{driveDataForPreview.drive_duration}</span>
            </div>
          </article>
          <article className='mt-4 w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <h2 className='font-bold text-gray-700 flex flex-row items-center justify-between' id='overview'>
                <span>Overview</span>
                <a href={companyData?.website?.startsWith("http") ? companyData?.website : `https://${companyData?.website}`} className='text-blue-500 underline ml-2 text-sm' rel="noopener noreferrer" target='_blank'>
                  <span className='flex flex-row items-center'>
                    Visit official Website <ArrowTopRightIcon />
                  </span>
                </a>
              </h2>
              <p className='text-justify text-gray-600 font-regular'>
                {companyData ? companyData.overview : ""}
              </p>
            </div>

            <div className='flex flex-col gap-1'>
              <h2 className='font-bold text-gray-700' id='roles'>Job Roles</h2>
              <table className="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Role Title</th>
                    <th className="px-4 py-2 border-b">Stipend Low</th>
                    <th className="px-4 py-2 border-b">Stipend High</th>
                    <th className="px-4 py-2 border-b">Salary Low</th>
                    <th className="px-4 py-2 border-b">Salary High</th>
                  </tr>
                </thead>
                <tbody>
                  {driveDataForPreview.roles.map((role: any) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='flex flex-col gap-1'>
              <h2 className='font-bold text-gray-700' id='responsibilites'>Qualifications</h2>
              <div className='text-justify text-gray-600 font-regular' dangerouslySetInnerHTML={{ __html: driveDataForPreview.qualifications }} />
            </div>

            <div className='flex flex-col gap-1'>
              <h2 className='font-bold text-gray-700' id='pointsToNote'>Points To Note</h2>
              <div className='text-justify text-gray-600 font-regular' dangerouslySetInnerHTML={{ __html: driveDataForPreview.points_to_note }}>
              </div>
            </div>

            <div className='w-full flex justify-end items-center gap-1 mt-6'>

              <Button
                variant={"default"}
                className='font-bold text-lg'
                onClick={onFormSubmit(onPublish)}
              >
                <Upload size={22} />
                <span className='pl-2'>Publish Opportunity</span>
              </Button>

            </div>
          </article>
        </section>
        <aside className="w-1/6 p-4">
          <h1 className="font-black text-lg">Navigate</h1>

          <ul className="mt-2 ml-2">
            <li className='flex items-center pb-2 justify-start'>
              <ArrowRight size={12} />
              <a href="#overview" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Overview</a>
            </li>
            <li className='flex items-center pb-2 justify-start'>
              <ArrowRight size={12} />
              <a href="#roles" className=' ml-1 underline-offset-2 hover:underline transition-all duration-700'>Job Roles</a>
            </li>
            <li className='flex items-center pb-2 justify-start'>
              <ArrowRight size={12} />
              <a href="#responsibilites" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Qualifications</a>
            </li>
            <li className='flex items-center pb-2 justify-start'>
              <ArrowRight size={12} />
              <a href="#pointsToNote" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Points To Note</a>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
}

export default CompanyPreviewPage
