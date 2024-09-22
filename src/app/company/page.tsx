import { Button } from '@/components/ui/button';
import { ArrowRight, Banknote, Calendar, Download, LocateIcon, MapPin } from 'lucide-react';
import React from 'react';

const CompanyPage = () => {
    return (
        <div>
            <section className="bg-gray-200 min-h-28 px-4 py-2 flex justify-between items-end rounded-lg">
                <div className="flex items-center">
                    {/* <img src="/path/to/logo.png" alt="Company Logo" className="h-10 mr-2" /> */}
                    <div>
                        <h1 className="text-4xl font-black">Amazon</h1>
                        <div className='text-md text-gray-600 font-regular'>
                            <span>Software Developer</span> | <span>20 LPA</span>
                        </div>
                    </div>
                </div>
                <div className='h-full border flex gap-2 items-end justify-end'>
                    <Button >
                        <span className='flex gap-2 items-center justify-center'>
                            <span>Job Description</span><Download size={15} strokeWidth={3} />
                        </span>
                    </Button>
                    <Button>Apply</Button>
                </div>
            </section>

            <section className="flex mt-4">
                <aside className="w-1/6 p-4">
                    <h1 className="font-black text-lg">Navigate</h1>

                    <ul className="mt-2 ml-2">
                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#Qualification" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Overview</a>
                        </li>
                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#Qualification" className=' ml-1 underline-offset-2 hover:underline transition-all duration-700'>Job Title</a>
                        </li>
                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#Qualification" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Key Responsibilities</a>
                        </li>
                        <li className='flex items-center pb-2 justify-start'>
                            <ArrowRight size={12} />
                            <a href="#Qualification" className='ml-1 underline-offset-2 hover:underline transition-all duration-700'>Qualifications</a>
                        </li>
                    </ul>
                </aside>

                <section className="flex-1 py-4 ml-4">
                    <article className='flex flex-row items-center justify-around gap-4 bg-gray-200 rounded-lg'>
                        <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
                            <div className='flex items-center justify-center gap-2'>
                                <MapPin size={16} color='gray' /> <span className='text-md font-medium text-gray-600'>Location</span>
                            </div>
                            <span className='text-xl font-bold'>Banglore</span>
                        </div>

                        <div className='h-5 border border-gray-400 rounded-full'></div>
                        <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
                            <div className='flex items-center justify-center gap-2'>
                                <Banknote size={18} color='gray' /> <span className='text-md font-medium text-gray-600'>CTC (Annual)</span>
                            </div>
                            <span className='text-xl font-bold'>24 LPA</span>
                        </div>
                        <div className='h-5 border border-gray-400 rounded-full'></div>
                        <div className='flex flex-col w-1/5 items-start justify-center py-4 px-2'>
                            <div className='flex items-center justify-center gap-2'>
                                <Calendar size={16} color='gray' /> <span className='text-md font-medium text-gray-600'>Date of Drive</span>
                            </div>
                            <span className='text-xl font-bold'>25th-27th Sept</span>
                        </div>
                    </article>
                    <article className='mt-4 w-full flex flex-col gap-6'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-bold text-gray-700' id='overview'>Overview</h2>
                            <p className='text-justify text-gray-600 font-regular'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam dolorem possimus iure ipsa voluptatibus ipsum eius blanditiis excepturi dignissimos beatae modi, perspiciatis ex quis. Itaque ipsum totam aliquam excepturi incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum adipisci alias non illo animi libero. Id amet neque magnam odio, velit vero nemo animi quidem temporibus exercitationem sapiente, ipsam quis.
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h2 className='font-bold text-gray-700'>Job Title</h2>
                            <p className='text-justify text-gray-600 font-regular'>
                                Assocate Software Developer
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h2 className='font-bold text-gray-700'>Key Responsibilities</h2>
                            <p className='text-justify text-gray-600 font-regular'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam dolorem possimus iure ipsa voluptatibus ipsum eius blanditiis excepturi dignissimos beatae modi, perspiciatis ex quis. Itaque ipsum totam aliquam excepturi incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum adipisci alias non illo animi libero. Id amet neque magnam odio, velit vero nemo animi quidem temporibus exercitationem sapiente, ipsam quis.
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <h2 className='font-bold text-gray-700'>Qualifications</h2>
                            <p className='text-justify text-gray-600 font-regular'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam dolorem possimus iure ipsa voluptatibus ipsum eius blanditiis excepturi dignissimos beatae modi, perspiciatis ex quis. Itaque ipsum totam aliquam excepturi incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum adipisci alias non illo animi libero. Id amet neque magnam odio, velit vero nemo animi quidem temporibus exercitationem sapiente, ipsam quis.
                            </p>
                        </div>

                    </article>

                </section>
            </section>
        </div>
    );
};

export default CompanyPage;
