import JobListing from "@/components/JobListing";
import React from "react";

const JobsPage = () => {
  return (
    <div>
      <section className="bg-gray-100 min-h-28 p-6 flex justify-between items-end rounded-lg">
        <div className="flex items-center">
          <div>
            <h1 className="text-4xl font-black">Jobs</h1>
          </div>
        </div>
      </section>
      <section className="flex mt-4">
        <aside className="w-1/4 p-4"></aside>

        <section className="w-full flex flex-col gap-4">
          <JobListing
            companyName="Amazon"
            location="Bangalore"
            experience="1-5 Years"
            salary="24,00,000"
            isNew={true}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Google"
            location="Hyderabad"
            experience="3-7 Years"
            salary="36,00,000"
            isNew={true}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Microsoft"
            location="Pune"
            experience="2-4 Years"
            salary="28,00,000"
            isNew={true}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Facebook"
            location="Mumbai"
            experience="5-10 Years"
            salary="50,00,000"
            isNew={false}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Tesla"
            location="Chennai"
            experience="1-3 Years"
            salary="18,00,000"
            isNew={false}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Netflix"
            location="Delhi"
            experience="4-8 Years"
            salary="40,00,000"
            isNew={false}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Uber"
            location="Kolkata"
            experience="2-5 Years"
            salary="22,00,000"
            isNew={false}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Spotify"
            location="Noida"
            experience="3-6 Years"
            salary="30,00,000"
            isNew={false}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Salesforce"
            location="Gurgaon"
            experience="5-8 Years"
            salary="35,00,000"
            isNew={false}
            driveDate={new Date()}
          />
          <JobListing
            companyName="Flipkart"
            location="Ahmedabad"
            experience="0-2 Years"
            salary="12,00,000"
            isNew={false}
            driveDate={new Date()}
          />
        </section>
      </section>
    </div>
  );
};

export default JobsPage;
