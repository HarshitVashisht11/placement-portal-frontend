"use client";
import { auth_api } from "@/lib/api";
import React, { useEffect, useState } from "react";
import ProfileCreateForm from "@/app/admin/dashboard/drive/_components/profile-create-form";
import PageContainer from "@/components/layout/page-container";
import { StudentOnboardingSchema } from "@/schemas/schema";


const Profile = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  const [userOnboardingInfo, setUserOnboardingInfo] =
    useState<Zod.infer<typeof StudentOnboardingSchema> | null>(null);
  const [userData, setUserData] = useState<User>();

  async function GetStudentData() {
    try {
      const response = await auth_api.get("/user");
      if (response.status === 200) {
        setUserData(response.data.data);
        setIsOnboarded(response.data.data.isOnboarded);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const GetStudentOnboardingInfo = async () => {
    try {
      const response = await auth_api.get("/user/data");
      if (response.status === 200) {
        setUserOnboardingInfo(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetStudentData();
    GetStudentOnboardingInfo();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <PageContainer scrollable>
      <section className="border-b rounded-lg">
        <div
          className="relative w-full h-[150px] rounded-lg bg-gradient-to-tr"
          style={{
            backgroundImage: "linear-gradient(45deg, #93c5fd, #6ee7b7)",
          }}
        >
          <div className="absolute size-36 -bottom-14 left-5 rounded-full border-4 border-white bg-black">
            <img
              width={500}
              height={500}
              src={
                `https://api.dicebear.com/9.x/initials/svg?seed=` +
                userData.name
              }
              alt="Avatar"
              className="w-full h-full aspect-square rounded-full"
            ></img>
          </div>
        </div>
        <div className="p-5 ml-2 flex flex-col">
          <span className="mt-10 text-2xl font-black">{userData.name}</span>
          <span className="text-md font-regular text-gray-600">
            {userData.rollnum}
          </span>
        </div>
      </section>
      <section className="flex mt-4">
        <section className="flex-1 py-4 ml-4">
          <div className="space-y-4">
            <ProfileCreateForm initialData={userOnboardingInfo} isOnboarded={isOnboarded} categories={[]} />
          </div>
        </section>
      </section>
    </PageContainer>
  );
};

export default Profile;
