"use client";
import { Button } from "@/components/ui/button";
import { auth_api } from "@/lib/api";
import { ArrowRight, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import StudentOnboardingForm from "./_components/student-onboarding-form";
import ProfileCreateForm from "@/app/admin/dashboard/drive/_components/profile-create-form";
import PageContainer from "@/components/layout/page-container";

const Profile = () => {
  const [isUpdatingSGPA, setIsUpdatingSGPA] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  async function GetUserData() {
    try {
      const response = await auth_api.get("/user");
      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetUserData();
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
          <p className="mt-2 text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            sequi neque laudantium amet corporis molestias assumenda eveniet
            laborum est temporibus sed atque maiores modi rem nulla, harum
            incidunt consequatur earum.
          </p>
        </div>
      </section>
      <section className="flex mt-4">
        {/* <aside className="w-1/6 p-4">
          <h1 className="font-black text-lg">Navigate</h1>

          <ul className="mt-2 ml-2">
            <li className="flex items-center pb-2 justify-start">
              <ArrowRight size={12} />
              <a
                href="#sgpa"
                className="ml-1 underline-offset-2 hover:underline transition-all duration-700"
              >
                SGPA
              </a>
            </li>
            <li className="flex items-center pb-2 justify-start">
              <ArrowRight size={12} />
              <a
                href="#resume"
                className=" ml-1 underline-offset-2 hover:underline transition-all duration-700"
              >
                Resume
              </a>
            </li>
          </ul>
        </aside> */}

        <section className="flex-1 py-4 ml-4">
          {/* <article className="mt-4 w-full flex flex-col gap-6">
                        <div className="p-4 flex flex-col gap-1 rounded-xl border">
                            <div className="flex gap-2 items-center justify-start">
                                <h2 className="font-bold text-gray-700" id="overview">
                                    SGPA
                                </h2>
                                <Button
                                    variant="ghost"
                                    className="rounded-lg"
                                    onClick={() => {
                                        setIsUpdatingSGPA((isUpdatingSGPA) => !isUpdatingSGPA)
                                    }}
                                >
                                    <Edit size={15} />
                                </Button>
                            </div>

                            {isUpdatingSGPA ? (
                                <div className="flex w-full mt-2">
                                    <div className="flex gap-2 items-end justify-start w-1/6">
                                        <span>Sem 1:</span>
                                        <input
                                            step={0.01}
                                            min={0}
                                            type="number"
                                            name="sem1SGPA"
                                            id="sem1SGPA"
                                            className="border-b-2 px-2 focus:outline-none w-14 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    <div className="flex gap-2 items-end justify-start w-1/6">
                                        <span>Sem 2:</span>
                                        <input
                                            step={0.01}
                                            min={0}
                                            type="number"
                                            name="sem2SGPA"
                                            id="sem2SGPA"
                                            className="border-b-2 px-2 focus:outline-none w-14 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    <div className="flex gap-2 items-end justify-start w-1/6">
                                        <span>Sem 3:</span>
                                        <input
                                            step={0.01}
                                            min={0}
                                            type="number"
                                            name="sem3SGPA"
                                            id="sem3SGPA"
                                            className="border-b-2 px-2 focus:outline-none w-14 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    <div className="flex gap-2 items-end justify-start w-1/6">
                                        <span>Sem 4:</span>
                                        <input
                                            step={0.01}
                                            min={0}
                                            type="number"
                                            name="sem4SGPA"
                                            id="sem4SGPA"
                                            className="border-b-2 px-2 focus:outline-none w-14 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    <div className="flex gap-2 items-end justify-start w-1/6">
                                        <span>Sem 5:</span>
                                        <input
                                            step={0.01}
                                            min={0}
                                            type="number"
                                            name="sem5SGPA"
                                            id="sem5SGPA"
                                            className="border-b-2 px-2 focus:outline-none w-14 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    <div className="flex gap-2 items-end justify-start w-1/6">
                                        <span>Sem 6:</span>
                                        <input
                                            step={0.01}
                                            min={0}
                                            type="number"
                                            name="sem6SGPA"
                                            id="sem6SGPA"
                                            className="border-b-2 px-2 focus:outline-none w-14 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full mt-2">
                                    <ol type="a" className="flex w-full justify-around">
                                        <li className="w-1/6">
                                            <span className="font-bold">Sem 1: </span>8.56
                                        </li>
                                        <li className="w-1/6">
                                            <span className="font-bold">Sem 2: </span>8.61
                                        </li>
                                        <li className="w-1/6">
                                            <span className="font-bold">Sem 3: </span>9.14
                                        </li>
                                        <li className="w-1/6">
                                            <span className="font-bold">Sem 4: </span>9.27
                                        </li>
                                        <li className="w-1/6">
                                            <span className="font-bold">Sem 5: </span>9.68
                                        </li>
                                        <li className="w-1/6">
                                            <span className="font-bold">Sem 6: </span>9.48
                                        </li>
                                    </ol>
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex flex-col gap-1 rounded-xl border">
                            <h2 className="font-bold text-gray-700">Resume</h2>
                        </div>
                    </article> */}
          <div className="space-y-4">
            <ProfileCreateForm initialData={null} categories={[]} />
          </div>
        </section>
      </section>
    </PageContainer>
  );
};

export default Profile;
